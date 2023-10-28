import { memo, useCallback, useEffect, useMemo } from "react";

import DownloadSelect from "@/components/core/DownloadSelect";
import ReportByDropdown from "../ReportByDropdown";
import ReportTable from "../ReportTable";
import ReportCharts from "../ReportCharts";

import { dropdownByDate } from "@/utils/constants/report";
import { roleNames } from "@/utils/constants/enum";

import useReportManagement from "@/services/hooks/useReportManagement";
import useUser from "@/services/hooks/useUser";
import useUserManagement from "@/services/hooks/useUserManagement";

import "./styles.scss";

const defaultParams = {
  pageSize: 99999,
  pageNumber: 0,
};

const Report = () => {
  const { roles } = useUser();
  const {
    playerUsers,
    facilitatorUsers,
    onGetFacilitatorUsers,
    onGetPlayerUsers,
  } = useUserManagement();
  const {
    sessionList,
    onGetUserReportList,
    onGetChartReport,
    onGetSessionList,
  } = useReportManagement();

  const rolesID = useMemo(() => {
    if (roles?.length) {
      const playerId = roles.find(
        (role) => role.name.toLowerCase() === roleNames.player
      ).id;
      const facilitatorId = roles.find(
        (role) => role.name.toLowerCase() === roleNames.facilitator
      ).id;

      return { playerId, facilitatorId };
    }

    return null;
  }, [roles]);

  useEffect(() => {
    onGetSessionList();
    onGetChartReport({
      monthDuration: 5,
    });
  }, []);

  useEffect(() => {
    if (rolesID) {
      onGetFacilitatorUsers({
        ...defaultParams,
        roleId: rolesID.facilitatorId,
      });
      onGetPlayerUsers({ ...defaultParams, roleId: rolesID.playerId });
      onGetUserReportList({
        ...rolesID,
        pageNumber: 0,
        pageSize: 10,
      });
    }
  }, [rolesID]);

  const handleDownloadReport = useCallback((fileType) => {}, []);

  const handePageClick = useCallback(
    (page) => {
      onGetUserReportList({
        ...rolesID,
        pageNumber: page.selected,
        pageSize: 10,
      });
    },
    [rolesID]
  );

  return (
    <div className="mcmc-report">
      <div className="mcmc-report__header">
        <h2 className="mcmc-report__title">Dashboard Report</h2>
        <DownloadSelect onSelect={handleDownloadReport} />
      </div>
      <div className="mcmc-report__search">
        <ReportByDropdown
          title="By Date"
          dropdownID="byDate"
          data={dropdownByDate}
        />
        <ReportByDropdown
          title="By Session"
          dropdownID="bySession"
          isMultiSearch
          data={sessionList}
        />
        <ReportByDropdown
          title="By Facilitator"
          dropdownID="byFacilitator"
          isMultiSearch
          data={facilitatorUsers}
        />
        <ReportByDropdown
          title="By Player"
          dropdownID="byPlayer"
          isMultiSearch
          data={playerUsers}
        />
      </div>
      <ReportTable onPageClick={handePageClick} />
      <ReportCharts />
    </div>
  );
};

export default memo(Report);
