import { useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "@/components/core/Logo";
import AuthButton from "@/components/core/AuthButton";

import useAuth from "@/services/hooks/useAuth";

import "./styles.scss";

const AuthMainPage = () => {
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const handleLogin = useCallback(() => {
    onLogin();
  }, []);

  return (
    <div className="mcmc-auth-main">
      <div className="mcmc-auth-main__logo-area">
        <p className="mcmc-welcome">Welcome to</p>
        <Logo />
        <p className="mcmc-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </div>
      <hr />
      <div className="mcmc-auth-main__option-area">
        <p className="mcmc-auth-main__choose-title">Choose to log in</p>
        <AuthButton btnText="MCMC Staff" onClick={handleLogin} />
        <AuthButton btnText="Other User" onClick={() => navigate("/login")} />
        <p className="mcmc-quest">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default memo(AuthMainPage);
