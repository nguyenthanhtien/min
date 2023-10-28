import { memo } from "react";

import { ReactComponent as ProfileIcon } from "@/assets/icons/profile.svg";

const ProfilePicture = () => (
  <div className="mcmc-profile-pic">
    <ProfileIcon />
  </div>
);

export default memo(ProfilePicture);
