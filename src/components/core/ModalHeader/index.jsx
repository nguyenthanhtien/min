import { memo } from "react";

import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";

import ButtonIcon from "../ButtonIcon";

import "./styles.scss";

const ModalHeader = ({ title, subTitle, onCloseModal }) => {
  return (
    <div className="mcmc-modal-header">
      <div className="mcmc-modal-header__right">
        <span className="mcmc-modal-header__title">{title || ""}</span>
        {subTitle ? (
          <span className="mcmc-modal-header__sub-title"> - {subTitle}</span>
        ) : null}
      </div>
      <div className="mcmc-modal-header__left">
        <ButtonIcon icon={<CloseIcon />} onClick={onCloseModal} />
      </div>
    </div>
  );
};

export default memo(ModalHeader);
