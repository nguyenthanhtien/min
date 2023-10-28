import { useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow-thick-left.svg";

import Logo from "@/components/core/Logo";
import AuthButton from "@/components/core/AuthButton";
import AuthInputBox from "@/components/core/AuthInputBox";
import Checkbox from "@/components/core/Checkbox";

import authContext from "@/services/contexts/authContext";
import useUser from "@/services/hooks/useUser";

import "./styles.scss";

const RegisterPage = () => {
  const authProps = useContext(authContext);
  const navigate = useNavigate();
  const { onRegister } = useUser();
  const {
    control,
    register,
    formState: { errors },
    watch,
    resetField,
    handleSubmit: onSubmit,
  } = useForm();

  const handleReset = useCallback(() => {
    resetField("fullName");
    resetField("email");
    resetField("password");
    resetField("gender", { defaultValue: false });
  }, []);

  const handleSubmit = useCallback((formData) => {
    onRegister({
      formData,
      callback: (token) => {
        authProps.onSetToken(token);
        navigate("/");
      },
    });
  }, []);

  return (
    <div className="mcmc-auth mcmc-register">
      <Link to="/" className="mcmc-back-arrow">
        <ArrowIcon />
      </Link>
      <div className="mcmc-register__logo-area">
        <Logo />
        <p className="mcmc-desc">Enter your details to create account</p>
      </div>
      <div className="mcmc-register__form-area">
        <form className="mcmc-register__form">
          <AuthInputBox
            iLabel="Full Name"
            iName="fullName"
            iPlaceholder="Text"
            register={register}
            required
          />
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
            errorMessage={errors["password"]?.message}
          />
          <div className="mcmc-register__gender">
            <p className="mcmc-register__gender__title">Gender</p>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Checkbox
                  cType="radio"
                  cName="gender"
                  cTitle="Male"
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Checkbox
                  cType="radio"
                  cName="gender"
                  cTitle="Female"
                  onChange={onChange}
                />
              )}
            />
          </div>
        </form>
        <div className="mcmc-register__option-area">
          <AuthButton
            btnText="RESET"
            disabled={!Object.values(watch()).some((value) => value)}
            onClick={handleReset}
          />
          <AuthButton btnText="SEND" onClick={onSubmit(handleSubmit)} />
          <div className="mcmc-quest terms">
            <Controller
              name="terms"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Checkbox
                  cType="checkbox"
                  cName="terms"
                  onChange={onChange}
                />
              )}
            />
            By creating an account, you agree to our&nbsp;
            <Link to="#">Terms</Link>
          </div>
          <p className="mcmc-quest">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
