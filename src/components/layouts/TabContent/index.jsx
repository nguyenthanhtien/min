import { memo } from "react";

import { tabIDs } from "@/utils/constants/tabNavigation";

import MyProfile from "../MyProfile";
import AllUser from "../AllUser";
import Report from "../Report";
import Logout from "../Logout";

import useTabNavigation from "@/services/hooks/useTabNavigation";

const tabs = {
  [tabIDs.myProfile]: <MyProfile />,
  [tabIDs.allUser]: <AllUser />,
  [tabIDs.report]: <Report />,
  [tabIDs.logout]: <Logout />,
};

const TabContent = () => {
  const { activatedTabId } = useTabNavigation();

  return tabs[activatedTabId];
};

export default memo(TabContent);
