import { call, put, takeLatest } from "redux-saga/effects";

import { getData, postData, putData } from "@/services/api";

import {
  USER_LIST,
  USER_DETAIL,
  FIND_USERS,
  UPDATE_USER,
  USERS_BY_ROLE,
} from "@/utils/constants/apiPaths";

import {
  getUserListRequest,
  getUserListSuccess,
  getUserListFailed,
  getUserDetailRequest,
  getUserDetailSuccess,
  getUserDetailFailed,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  getPlayerUsersRequest,
  getPlayerUsersSuccess,
  getPlayerUsersFailed,
  getFacilitatorUsersRequest,
  getFacilitatorUsersSuccess,
  getFacilitatorUsersFailed,
} from "@/slices/userManagement";

export function* getUserList({ payload }) {
  const { pageSize, pageNumber, keyword } = payload;
  const params = keyword
    ? {
        pageSize,
        pageNumber,
        keyword,
      }
    : {
        pageSize,
        pageNumber,
      };

  try {
    const { data } = yield call(postData, {
      url: keyword ? FIND_USERS : USER_LIST,
      data: params,
    });

    if (data.isSuccess) {
      yield put(getUserListSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getUserListFailed(message));
  }
}

export function* getUserDetail({ payload }) {
  try {
    const { data } = yield call(getData, {
      url: USER_DETAIL.replace("{username}", payload),
    });

    if (data) {
      yield put(getUserDetailSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getUserDetailFailed(message));
  }
}

export function* updateUser({ payload }) {
  const { params, pageNumber, callback } = payload;

  try {
    const { data } = yield call(putData, {
      url: UPDATE_USER,
      data: params,
    });

    if (data) {
      if (pageNumber != null) {
        yield put(getUserDetailRequest(params?.userName));
        yield put(
          getUserListRequest({
            pageSize: 8,
            pageNumber: pageNumber,
          })
        );
      }
      if (typeof callback === "function") {
        callback();
      }
      yield put(updateUserSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(updateUserFailed(message));
  }
}

export function* getFacilitatorUsers({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: USERS_BY_ROLE,
      data: payload,
    });

    if (data.isSuccess) {
      yield put(
        getFacilitatorUsersSuccess(
          data.data?.length
            ? data.data.map((user) => ({ id: user.id, value: user.fullName }))
            : []
        )
      );
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getFacilitatorUsersFailed(message));
  }
}

export function* getPlayerUsers({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: USERS_BY_ROLE,
      data: payload,
    });

    if (data.isSuccess) {
      yield put(
        getPlayerUsersSuccess(
          data.data?.length
            ? data.data.map((user) => ({ id: user.id, value: user.fullName }))
            : []
        )
      );
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getPlayerUsersFailed(message));
  }
}

export default function* userManagementSaga() {
  yield takeLatest(getUserListRequest().type, getUserList);
  yield takeLatest(getUserDetailRequest().type, getUserDetail);
  yield takeLatest(updateUserRequest().type, updateUser);
  yield takeLatest(getPlayerUsersRequest().type, getPlayerUsers);
  yield takeLatest(getFacilitatorUsersRequest().type, getFacilitatorUsers);
}
