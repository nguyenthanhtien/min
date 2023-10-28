import { memo } from "react";

import "./styles.scss";

const ButtonText = ({ btnText, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <a className="mcmc-btnText" onClick={handleClick}>
      {btnText}
    </a>
  );
};

export default memo(ButtonText);
