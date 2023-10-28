import { memo } from "react";

import "./styles.scss";

const Modal = ({ isShow, children }) => {
  if (!isShow) return null;

  return (
    <>
      <div className="mcmc-modal-backdrop" />
      <div className="mcmc-modal">{children}</div>
    </>
  );
};

export default memo(Modal);
