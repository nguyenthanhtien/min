import { memo, useState, useEffect, useCallback } from "react";
import RSwitch from "react-switch";

import "./styles.scss";

const Switch = ({ isChecked, textChecked, textUnchecked, onChange }) => {
  const [checked, setChecked] = useState(!!isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handleChange = useCallback((checkValue) => {
    if (typeof onChange === "function") {
      onChange(checkValue);
    }
    setChecked(checkValue);
  }, []);

  return (
    <div className="mcmc-switch">
      <RSwitch
        className="mcmc-switch__button"
        width={32}
        height={19}
        handleDiameter={16}
        uncheckedIcon={false}
        checkedIcon={false}
        offColor="#D4D4D4"
        onColor="#02B3F0"
        activeBoxShadow="0"
        checked={checked}
        onChange={handleChange}
      />
      {textChecked ? (
        <p className="mcmc-switch__text">
          {checked ? textChecked : textUnchecked}
        </p>
      ) : null}
    </div>
  );
};

export default memo(Switch);
