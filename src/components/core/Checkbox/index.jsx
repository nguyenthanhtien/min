import { memo, useCallback } from "react";

import "./styles.scss";

const Checkbox = ({ cId, cType, cTitle, cName, disabled, onChange }) => {
  const handleCheck = useCallback((e) => {
    if (typeof onChange === "function") {
      onChange(e.target.checked ? cTitle || e.target.checked : "");
    }
  }, [cTitle]);

  return (
    <div className="mcmc-checkbox">
      <label className="mcmc-checkbox__label">
        <input
          type={cType || "checkbox"}
          className="mcmc-checkbox__input"
          id={cId}
          name={cName}
          disabled={disabled}
          onChange={handleCheck}
        />
        <div className="mcmc-checkbox__icon" id="icon" />
        {cTitle ? (
          <p type="checkbox" className="mcmc-checkbox__name">
            {cTitle}
          </p>
        ) : null}
      </label>
    </div>
  );
};

export default memo(Checkbox);
