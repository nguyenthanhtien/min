import { call, put, takeLatest } from "redux-saga/effects";

import { postData } from "@/services/api";

import {
  DASHBOARD_USER_REPORT,
  DASHBOARD_CHART_REPORT,
  SESSION_LIST,
} from "@/utils/constants/apiPaths";

import {
  getUserReportListRequest,
  getUserReportListSuccess,
  getUserReportListFailed,
  getChartReportRequest,
  getChartReportSuccess,
  getChartReportFailed,
  getSessionListRequest,
  getSessionListSuccess,
  getSessionListFailed,
} from "@/slices/reportManagement";

export function* getUserReportList({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: DASHBOARD_USER_REPORT,
      data: payload,
    });

    if (data.isSuccess) {
      yield put(getUserReportListSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getUserReportListFailed(message));
  }
}

export function* getChartReport({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: DASHBOARD_CHART_REPORT,
      data: payload,
    });

    if (data?.chart) {
      yield put(getChartReportSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getChartReportFailed(message));
  }
}

export function* getSessionList({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: SESSION_LIST,
      data: payload,
    });

    if (data) {
      yield put(getSessionListSuccess(data.length ? data : []));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getSessionListFailed(message));
  }
}

export default function* userManagementSaga() {
  yield takeLatest(getUserReportListRequest().type, getUserReportList);
  yield takeLatest(getChartReportRequest().type, getChartReport);
  yield takeLatest(getSessionListRequest().type, getSessionList);
}
