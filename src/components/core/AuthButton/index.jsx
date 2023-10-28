import { memo, useCallback } from "react";

import "./styles.scss";

const AuthButton = ({ btnType, btnText, disabled, onClick }) => {
  const handleClickOnButton = useCallback(() => {
    if (typeof onClick === "function") {
      onClick();
    }
  }, []);

  return (
    <button
      type={btnType || "button"}
      className="mcmc-auth-btn"
      disabled={disabled}
      onClick={handleClickOnButton}
    >
      {btnText}
    </button>
  );
};

export default memo(AuthButton);
