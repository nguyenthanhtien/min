import { useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-thick-left.svg";

import Logo from "@/components/core/Logo";
import AuthButton from "@/components/core/AuthButton";
import AuthInputBox from "@/components/core/AuthInputBox";

import authContext from "@/services/contexts/authContext";
import useUser from "@/services/hooks/useUser";

import "./styles.scss";

const LoginPage = () => {
  const authProps = useContext(authContext);
  const navigate = useNavigate();
  const { onLogin } = useUser();
  const {
    register,
    formState: { errors },
    watch,
    resetField,
    handleSubmit: onSubmit,
  } = useForm();

  const handleReset = useCallback(() => {
    resetField("Email");
    resetField("Password");
  }, []);

  const handleSubmit = useCallback((formData) => {
    onLogin({
      formData,
      callback: (token) => {
        authProps.onSetToken(token);
        navigate("/");
      },
    });
  }, []);

  return (
    <div className="mcmc-auth mcmc-login">
      <Link to="/" className="mcmc-back-arrow">
        <ArrowIcon />
      </Link>
      <div className="mcmc-login__logo-area">
        <Logo />
        <p className="mcmc-desc">
          Enter your details to log in to your account
        </p>
      </div>
      <div className="mcmc-login__form-area">
        <form className="mcmc-login__form">
          <AuthInputBox
            iLabel="Email"
            iName="email"
            iPlaceholder="name@email.com"
            register={register}
            required
          />
          <AuthInputBox
            iType="password"
            iLabel="Password"
            iName="password"
            iPlaceholder="*******"
            register={register}
            required
            minLength={6}
            errorMessage={errors["Password"]?.message}
          />
        </form>
        <div className="mcmc-login__option-area">
          <AuthButton
            btnText="RESET"
            disabled={!Object.values(watch()).some((value) => value)}
            onClick={handleReset}
          />
          <AuthButton btnText="SEND" onClick={onSubmit(handleSubmit)} />
          <div className="mcmc-quest">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </div>
          <p className="mcmc-quest">
            Forgot your password?{" "}
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
