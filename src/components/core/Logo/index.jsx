import { memo } from "react";

import LogoText from "@/assets/images/logoText.svg";

const Logo = () => (
  <div className="mcmc-logo">
    <img alt="Logo" src={LogoText} />
  </div>
);

export default memo(Logo);
