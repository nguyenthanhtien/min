import { memo, useState, useCallback } from "react";

import { tabIDs } from "@/utils/constants/tabNavigation";

import useTabNavigation from "@/services/hooks/useTabNavigation";
import useUserManagement from "@/services/hooks/useUserManagement";

import "./styles.scss";

const TabNavigation = () => {
  const [selectedTabId, setSelectedTabId] = useState(tabIDs.myProfile);

  const { filteredTabs, onSetTabId } = useTabNavigation();
  const { userList } = useUserManagement();

  const handleClickTabName = useCallback((tab) => {
    onSetTabId(tab.id);
    setSelectedTabId(tab.id);
  }, []);

  return (
    <div className="mcmc-tab-nav">
      {filteredTabs.map((tab) => (
        <div
          key={tab.id}
          className={`mcmc-tab-item${
            tab.id === selectedTabId ? " activated" : ""
          }`}
          onClick={() => handleClickTabName(tab)}
        >
          <p className="mcmc-tab-name">{tab.name}</p>
          {tab.id === tabIDs.allUser ? (
            <p className="mcmc-tab-number">{userList.data.totalRecords}</p>
          ) : null}
        </div>
      ))}
      <div className="mcmc-tab-item" />
    </div>
  );
};

export default memo(TabNavigation);
