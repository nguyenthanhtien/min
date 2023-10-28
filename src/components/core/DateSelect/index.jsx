import { memo, useCallback, useRef } from "react";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-select.svg";

import useClickOutside from "@/services/hooks/useClickOutSide";

import "./styles.scss";

const DateSelect = ({ onSelect }) => {
  const parentRef = useRef();
  const selectRef = useRef();

  useClickOutside(parentRef, () => {
    selectRef.current?.classList?.remove("show");
  });

  const handleToggleSelect = useCallback(() => {
    selectRef.current.classList.toggle("show");
  }, []);

  const handleSelect = useCallback((fileType) => {
    if (typeof onSelect === "function") {
      onSelect(fileType);
    }

    handleToggleSelect();
  }, []);

  return (
    <div className="mcmc-report__date-select">
      <div className="mcmc-report__date-select__select" ref={parentRef}>
        <button type="button" onClick={handleToggleSelect}>
          <p className="mcmc-report__date-select__selected" />
          <ArrowIcon />
        </button>
        <div ref={selectRef} className="mcmc-report__date-select__dropdown">
          <input type="radio" id="d-1y" name="mcmc-dSelect" />
          <label htmlFor="d-1y" onClick={() => handleSelect("1 year")}>
            1 year
          </label>
          <input type="radio" id="d-6m" name="mcmc-dSelect" />
          <label htmlFor="d-6m" onClick={() => handleSelect("6 months")}>
            6 months
          </label>
          <input type="radio" id="d-3m" name="mcmc-dSelect" />
          <label htmlFor="d-3m" onClick={() => handleSelect("3 months")}>
            3 months
          </label>
          <input type="radio" id="d-1m" name="mcmc-dSelect" />
          <label htmlFor="d-1m" onClick={() => handleSelect("1 month")}>
            1 month
          </label>
        </div>
      </div>
    </div>
  );
};

export default memo(DateSelect);
