import { useCallback, useMemo } from "react";

import ButtonText from "@/components/core/ButtonText";
import Switch from "@/components/core/Switch";
import Achievements from "@/components/core/Achievements";
import Sessions from "@/components/core/Sessions";

import { allUserHeaderNames, reportHeaderNames } from "@/utils/constants/table";
import { getRoleNames } from "@/utils/user";

import useUser from "./useUser";
import useUserManagement from "./useUserManagement";

const useTable = () => {
  const { roles } = useUser();
  const { onGetUserDetail, onUpdateUser } = useUserManagement();

  const handleUserNameClick = useCallback((data) => {
    onGetUserDetail(data.userName);
  }, []);

  const handlePlayerNameClick = useCallback((data) => {}, []);

  const handleSwitchToggle = useCallback((checked, userName, userRoles) => {
    onUpdateUser({
      params: {
        userName,
        roles: userRoles.split(", "),
        isActive: checked,
      },
    });
  }, []);

  const handleSessionClick = useCallback(() => {}, []);

  const allUserHeaders = useMemo(
    () => [
      allUserHeaderNames.no,
      {
        ...allUserHeaderNames.fullName,
        hasIcon: true,
        render: (data) => (
          <ButtonText
            btnText={data.fullName}
            onClick={() => handleUserNameClick(data)}
          />
        ),
      },
      allUserHeaderNames.email,
      {
        ...allUserHeaderNames.roles,
        hasIcon: true,
        render: (data) => {
          const roleNames = getRoleNames({ roles, roleIDs: data?.roles });
          return <>{roleNames}</>;
        },
      },
      {
        ...allUserHeaderNames.active,
        render: (data) => {
          const roleNames = getRoleNames({ roles, roleIDs: data?.roles });

          return (
            <Switch
              isChecked={data?.isActive}
              onChange={(checkValue) =>
                handleSwitchToggle(checkValue, data.userName, roleNames)
              }
            />
          );
        },
      },
    ],
    [roles]
  );

  const reportHeaders = useMemo(
    () => [
      reportHeaderNames.no,
      {
        ...reportHeaderNames.playerName,
        hasIcon: true,
        render: (data) => (
          <ButtonText
            btnText={data.playerName}
            onClick={() => handlePlayerNameClick(data)}
          />
        ),
      },
      reportHeaderNames.email,
      {
        ...reportHeaderNames.sessions,
        render: (data) => (
          <Sessions sessions={data.sessions} onClick={handleSessionClick} />
        ),
      },
      {
        ...reportHeaderNames.achievements,
        render: (data) => <Achievements achievements={data.achievements} />,
      },
    ],
    [roles]
  );

  return {
    allUserHeaders,
    reportHeaders,
  };
};

export default useTable;
