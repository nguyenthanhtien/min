import { memo, useRef, useState, useCallback, useEffect } from "react";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-select.svg";

import Child from "./child";

import useClickOutside from "@/services/hooks/useClickOutSide";

import "./styles.scss";

const SearchDropdown = ({ id, isMultiSearch, searchPlaceholder, data }) => {
  const [selectedNames, setSelectedName] = useState([]);

  const parentRef = useRef();
  const checkboxRef = useRef();
  const searchInputRef = useRef();

  useClickOutside(parentRef, () => {
    checkboxRef.current.checked = false;
    searchInputRef.current.value = "";
  });

  const handleCheckClick = useCallback((values) => {
    setSelectedName(values);
  }, []);

  return (
    <div className="mcmc-s-dropdown" ref={parentRef}>
      <input type="checkbox" ref={checkboxRef} id={id} />
      <label htmlFor={id} className="mcmc-s-dropdown__display-box">
        <p className="mcmc-s-dropdown__display-name">
          {selectedNames?.length === data.length
            ? "All"
            : selectedNames?.length > 1
            ? "Multiple search"
            : selectedNames[0]}
        </p>
        <ArrowIcon />
      </label>
      <Child
        ref={searchInputRef}
        isMultiSearch={isMultiSearch}
        searchPlaceholder={searchPlaceholder}
        data={data}
        onCheck={handleCheckClick}
      />
    </div>
  );
};

export default memo(SearchDropdown);
