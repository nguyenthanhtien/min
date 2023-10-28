import { memo, useState, useEffect } from "react";

import WelcomeTo from "@/components/layouts/WelcomeTo";
import Logo from "@/components/core/Logo";
import TabNavigation from "@/components/layouts/TabNavigation";
import TabContent from "@/components/layouts/TabContent";

import useUser from "@/services/hooks/useUser";
import useUserManagement from "@/services/hooks/useUserManagement";

import "./styles.scss";

const HomePage = () => {
  const [welcomeLoading, setWelcomeLoading] = useState(3);

  const { profile, isAdmin, onGetProfile, onGetRoles } = useUser();
  const { onGetUserList } = useUserManagement();

  useEffect(() => {
    onGetRoles();
    onGetProfile();
    setTimeout(() => {
      setWelcomeLoading((prevState) => prevState - 1);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      onGetUserList({ pageSize: 8, pageNumber: 0 });
    }

    if (profile.status === "hasSucceeded" || profile.status === "hasFailed") {
      setWelcomeLoading((prevState) => prevState - 1);
    }
  }, [profile, isAdmin]);

  return welcomeLoading > 0 ? (
    <WelcomeTo />
  ) : (
    <div className="mcmc-dashboard">
      <div className="mcmc-dashboard__header">
        <TabNavigation />
        <Logo />
      </div>
      <div className="mcmc-dashboard__content">
        <TabContent />
      </div>
    </div>
  );
};

export default memo(HomePage);
