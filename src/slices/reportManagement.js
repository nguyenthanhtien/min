import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const ROOT_STATE_NAME = "reportManagement";

const initialState = {
  sessionList: [],
  userReportList: {
    data: [],
    status: "isLoading",
  },
  chartReport: {
    data: {},
    status: "isLoading",
  },
};

const reportManagementSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    getUserReportListRequest(state) {
      state.userReportList.status = "isFetching";
    },
    getUserReportListSuccess(state, action) {
      state.userReportList.data = action.payload;
      state.userReportList.status = "hasSucceeded";
    },
    getUserReportListFailed(state) {
      state.userReportList.status = "hasFailed";
    },
    getChartReportRequest(state) {
      state.chartReport.status = "isFetching";
    },
    getChartReportSuccess(state, action) {
      state.chartReport.data = action.payload;
      state.chartReport.status = "hasSucceeded";
    },
    getChartReportFailed(state) {
      state.chartReport.status = "hasFailed";
    },
    getSessionListRequest() {},
    getSessionListSuccess(state, action) {
      state.sessionList = action.payload;
    },
    getSessionListFailed() {},
  },
});

const { actions, reducer } = reportManagementSlice;

export default reducer;

export const {
  getUserReportListRequest,
  getUserReportListSuccess,
  getUserReportListFailed,
  getChartReportRequest,
  getChartReportSuccess,
  getChartReportFailed,
  getSessionListRequest,
  getSessionListSuccess,
  getSessionListFailed
} = actions;

export const rootSelector = (state) => state[ROOT_STATE_NAME] || {};

export const userReportListSelector = createSelector(
  rootSelector,
  ({ userReportList }) => userReportList
);

export const chartReportSelector = createSelector(
  rootSelector,
  ({ chartReport }) => chartReport
);

export const sessionListSelector = createSelector(
  rootSelector,
  ({ sessionList }) => sessionList
);
