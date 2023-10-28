import { useEffect, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import Logo from "@/components/core/Logo";
import AuthButton from "@/components/core/AuthButton";
import AuthInputBox from "@/components/core/AuthInputBox";

import useUser from "@/services/hooks/useUser";
import useToast from "@/services/hooks/useToast";

import "./styles.scss";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit: onSubmit,
  } = useForm();

  const { onResetPassword } = useUser();
  const { setToast } = useToast();

  const email = searchParams.get("email");
  const resetPasswordToken = searchParams.get("token");

  useEffect(() => {
    if (email && resetPasswordToken) {
      setValue("email", email);
      setValue("token", atob(resetPasswordToken));
    }
  }, []);

  const handleSubmit = useCallback((formData) => {
    onResetPassword({
      formData,
      callback: () => {
        navigate("/login");
        setToast({
          toastId: "rp-toast",
          toastTitle: "Password Reset",
          toastMessage: "Log in again with your new password.",
          toastTimer: 2000,
        });
      },
    });
  }, []);

  return (
    <div className="mcmc-auth mcmc-rp">
      <div className="mcmc-rp__logo-area">
        <Logo />
        <p className="mcmc-desc">
          Hi <span>{email?.split("@")[0] || ""}</span>. Enter your new password
        </p>
      </div>
      <div className="mcmc-rp__form-area">
        <form className="mcmc-rp__form">
          <AuthInputBox
            iLabel="Email"
            iName="email"
            iPlaceholder={email || "name@email.com"}
            disabled
            register={register}
          />
          <AuthInputBox
            iType="password"
            iLabel="New Password"
            iName="newPassword"
            iPlaceholder="*******"
            register={register}
            required
            minLength={6}
            errorMessage={errors["newPassword"]?.message}
          />
          <AuthInputBox
            iType="hidden"
            iName="token"
            register={register}
            required
          />
        </form>
        <div className="mcmc-rp__option-area">
          <AuthButton btnText="SEND" onClick={onSubmit(handleSubmit)} />
          <div className="mcmc-quest">
            Don’t have an account? <Link to="/register">Sign Up</Link>
          </div>
          <p className="mcmc-quest">
            Log in to different account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
