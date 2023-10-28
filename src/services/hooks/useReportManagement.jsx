import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  userReportListSelector,
  chartReportSelector,
  sessionListSelector,
  getUserReportListRequest,
  getChartReportRequest,
  getSessionListRequest
} from "@/slices/reportManagement";

const useReportManagement = () => {
  const dispatch = useDispatch();

  const userReportList = useSelector(userReportListSelector);
  const chartReport = useSelector(chartReportSelector);
  const sessionList = useSelector(sessionListSelector);

  const onGetUserReportList = useCallback((params) => {
    dispatch(getUserReportListRequest(params));
  }, []);

  const onGetChartReport = useCallback((params) => {
    dispatch(getChartReportRequest(params));
  }, []);

  const onGetSessionList = useCallback((params) => {
    dispatch(getSessionListRequest(params));
  }, []);

  return {
    userReportList,
    chartReport,
    sessionList,
    onGetUserReportList,
    onGetChartReport,
    onGetSessionList
  };
};

export default useReportManagement;
