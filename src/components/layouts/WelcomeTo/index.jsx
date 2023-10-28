import { memo } from "react";

import LogoAnimation from "@/assets/images/logoAnimation.gif";

import { getLogginUserInfo } from "@/services/storage";

import "./styles.scss";

const WelcomeTo = () => {
  const userInfo = getLogginUserInfo();

  return (
    <div className="mcmc-welcome">
      <img alt="Logo animation" src={LogoAnimation} />
      <p className="mcmc-welcome__to">
        Welcome {userInfo || ""} to Metahrise
      </p>
      <p className="mcmc-welcome__loading">Loading to your account ...</p>
    </div>
  );
};

export default memo(WelcomeTo);
