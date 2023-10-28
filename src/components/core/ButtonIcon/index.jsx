import { memo } from "react";

const ButtonIcon = ({ icon, onClick }) => {
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button type="button" className="mcmc-btn-i" onClick={handleClick}>
      {icon}
    </button>
  );
};

export default memo(ButtonIcon);
