import { memo } from "react";

import "./styles.scss";

const AuthInputBox = ({
  iType,
  iLabel,
  iName,
  iPlaceholder,
  register,
  required,
  minLength,
  disabled,
  errorMessage,
}) => {
  return (
    <div className="mcmc-i-box">
      <div className="mcmc-i-box__header">
        <p className="mcmc-i-box__label">{iLabel}</p>
        {errorMessage ? (
          <p className="mcmc-i-box__message">{errorMessage}</p>
        ) : null}
      </div>
      <input
        type={iType || "text"}
        className="mcmc-i-box__input"
        placeholder={iPlaceholder}
        autoComplete="off"
        disabled={disabled}
        {...register(iName, {
          required,
          minLength: {
            value: minLength,
            message: `min. ${minLength} characters`,
          },
        })}
      />
    </div>
  );
};

export default memo(AuthInputBox);
