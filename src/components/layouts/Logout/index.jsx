import { useContext } from "react";

import ProfilePicture from "@/components/core/ProfilePicture";
import AuthButton from "@/components/core/AuthButton";

import { removeLogginUserInfo } from "@/services/storage";
import authContext from "@/services/contexts/authContext";

import "./styles.scss";

const Logout = () => {
  const authProps = useContext(authContext);

  const handleLogout = () => {
    authProps.onLogout();
    removeLogginUserInfo();
  };

  const handleClickCancel = () => {
    onSetTabId();
  };

  return (
    <div className="mcmc-logout">
      <ProfilePicture />
      <div className="mcmc-logout__content">
        <p className="mcmc-logout__question">
          Are you sure you want to logout?
        </p>
        <div>
          <AuthButton btnText="Cancel" disabled onClick={handleClickCancel} />
          <AuthButton btnText="OK" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Logout;
