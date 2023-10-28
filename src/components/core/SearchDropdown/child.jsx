import {
  memo,
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from "react";

import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";

import Checkbox from "../Checkbox";
import ButtonIcon from "../ButtonIcon";

const SearchDropdownChild = forwardRef(
  ({ isMultiSearch, searchPlaceholder, data, onCheck }, ref) => {
    const listRef = useRef();

    const handleSearchChange = useCallback(() => {
      console.log(ref.current.value);
    }, []);

    const handleSearchClick = useCallback(() => {}, [ref]);

    const handleAllCheck = useCallback((value) => {
      const allCheckInputEle = listRef.current.querySelectorAll("input");
      [...allCheckInputEle].forEach((c) => (c.checked = !!value));

      if (typeof onCheck === "function") {
        const allLabelEle = listRef.current.querySelectorAll("label");
        const selectedName = [...allLabelEle]
          .slice(1)
          .filter((l) => [...l.children][0].checked);
        onCheck(
          !!value ? selectedName.map((l) => [...l.children][2].innerText) : []
        );
      }
    }, []);

    const handleOptionCheck = useCallback(() => {
      if (isMultiSearch) {
        const allCheckInputEle = listRef.current.querySelectorAll("input");
        const optionUnChecked = [...allCheckInputEle]
          .slice(1)
          .filter((c) => !c.checked);
        [...allCheckInputEle][0].checked = optionUnChecked.length === 0;
      }

      if (typeof onCheck === "function") {
        const allLabelEle = listRef.current.querySelectorAll("label");
        const selectedName = [...allLabelEle]
          .slice(isMultiSearch ? 1 : 0)
          .filter((l) => [...l.children][0].checked);
        onCheck(selectedName.map((l) => [...l.children][2].innerText));
      }
    }, [data]);

    return (
      <div className="mcmc-s-dropdown__dropdown">
        <div className="mcmc-s-dropdown__search">
          <input
            type="text"
            ref={ref}
            placeholder={searchPlaceholder}
            onChange={handleSearchChange}
          />
          <ButtonIcon icon={<SearchIcon />} onClick={handleSearchClick} />
        </div>
        <div className="mcmc-s-dropdown__list" ref={listRef}>
          {isMultiSearch && data?.length ? (
            <Checkbox
              cTitle={`All ${searchPlaceholder?.split(" ")[1]}`}
              onChange={handleAllCheck}
            />
          ) : null}
          {data?.length
            ? data.map((c) => (
                <Checkbox
                  key={c.id}
                  cTitle={c.value}
                  onChange={handleOptionCheck}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
);

export default memo(SearchDropdownChild);
