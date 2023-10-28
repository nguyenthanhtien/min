import { memo, useRef, useEffect, useCallback } from "react";

import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";

import ButtonIcon from "../ButtonIcon";

import "./styles.scss";

const SearchInput = ({ placeHolder, value, onSubmit }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (value !== inputRef.current?.value) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleIconClick = useCallback(() => {
    if (typeof onSubmit === "function" && inputRef.current?.value != null) {
      onSubmit(inputRef.current.value);
    }
  }, []);

  return (
    <div className="mcmc-search">
      <input
        type="text"
        className="mcmc-search__input"
        id="mcmc-search-input"
        ref={inputRef}
        placeholder={placeHolder}
      />
      <ButtonIcon icon={<SearchIcon />} onClick={handleIconClick} />
    </div>
  );
};

export default memo(SearchInput);
