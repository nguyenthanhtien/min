import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-thick-left.svg";

import Logo from "@/components/core/Logo";
import AuthButton from "@/components/core/AuthButton";
import AuthInputBox from "@/components/core/AuthInputBox";

import useUser from "@/services/hooks/useUser";

import "./styles.scss";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit: onSubmit } = useForm();
  const { forgotPassword, onForgotPassword, onForgotPasswordResetState } =
    useUser();

  const handleSubmit = useCallback((formData) => {
    onForgotPassword(formData);
  }, []);

  const handleClickBack = useCallback(() => {
    navigate("/login");
    onForgotPasswordResetState();
  }, []);

  if (forgotPassword.status === "hasSucceeded") {
    return (
      <div className="mcmc-fp sent">
        <div className="mcmc-fp__logo-area">
          <Logo />
          <p className="mcmc-welcome">An email has sent to you!</p>
          <p className="mcmc-desc">Follow the instructions to reset it.</p>
        </div>
        <AuthButton btnText="BACK" onClick={handleClickBack} />
      </div>
    );
  }

  return (
    <div className="mcmc-auth mcmc-fp">
      <Link to="/" className="mcmc-back-arrow">
        <ArrowIcon />
      </Link>
      <div className="mcmc-fp__logo-area">
        <Logo />
        <p className="mcmc-welcome">Forgot Password?</p>
        <p className="mcmc-desc">
          We'll send you an email with instructions to reset it.
        </p>
      </div>
      <div className="mcmc-fp__form-area">
        <form className="mcmc-fp__form">
          <AuthInputBox
            iLabel="Email"
            iName="email"
            iPlaceholder="name@email.com"
            register={register}
            required
          />
        </form>
        <div className="mcmc-fp__option-area">
          <AuthButton btnText="CONTINUE" onClick={onSubmit(handleSubmit)} />
          <div className="mcmc-quest">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </div>
          <p className="mcmc-quest">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(ForgotPasswordPage);
