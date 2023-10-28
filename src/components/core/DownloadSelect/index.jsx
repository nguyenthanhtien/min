import { memo, useCallback, useRef } from "react";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-select.svg";

import useClickOutside from "@/services/hooks/useClickOutSide";

import "./styles.scss";

const DownloadSelect = ({ onSelect }) => {
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
    <div className="mcmc-report__download">
      <p className="mcmc-report__download__title">Download Report as</p>
      <div className="mcmc-report__download__select" ref={parentRef}>
        <button type="button" onClick={handleToggleSelect}>
          <p className="mcmc-report__download__selected" />
          <ArrowIcon />
        </button>
        <div ref={selectRef} className="mcmc-report__download__dropdown">
          <input type="radio" id="d-pdf" name="mcmc-d-select" />
          <label htmlFor="d-pdf" onClick={() => handleSelect("PDF")}>
            PDF
          </label>
          <input type="radio" id="d-csv" name="mcmc-d-select" />
          <label htmlFor="d-csv" onClick={() => handleSelect("CSV")}>
            CSV
          </label>
        </div>
      </div>
    </div>
  );
};

export default memo(DownloadSelect);
