import { call, put, takeLatest } from "redux-saga/effects";

import { getData, postData } from "@/services/api";

import {
  REGISTER,
  LOGIN,
  RESET_PASSWORD,
  CONFIRM_RESET_PASSWORD,
  PROFILE,
  ROLES,
} from "@/utils/constants/apiPaths";

import {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  getRolesRequest,
  getRolesSuccess,
  getRolesFailed,
} from "@/slices/user";

import { setLogginUserInfo } from "@/services/storage";

export function* register({ payload }) {
  const { formData, callback } = payload;

  try {
    const { data } = yield call(postData, {
      url: REGISTER,
      data: formData,
    });

    if (data.token) {
      setLogginUserInfo(data.user?.fullName);
      yield put(registerSuccess(data));
      callback(data.token);
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(registerFailed(message));
  }
}

export function* login({ payload }) {
  const { formData, callback } = payload;

  try {
    const { data } = yield call(postData, {
      url: LOGIN,
      data: formData,
    });

    if (data.token) {
      setLogginUserInfo(data.user?.fullName);
      yield put(loginSuccess(data));
      callback(data.token);
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(loginFailed(message));
  }
}

export function* getProfile() {
  try {
    const { data } = yield call(getData, {
      url: PROFILE,
    });

    if (data) {
      yield put(getProfileSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getProfileFailed(message));
  }
}

export function* forgotPassword({ payload }) {
  try {
    const { data } = yield call(postData, {
      url: RESET_PASSWORD,
      data: payload,
    });

    if (data) {
      yield put(forgotPasswordSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(forgotPasswordFailed(message));
  }
}

export function* resetPassword({ payload }) {
  const { formData, callback } = payload;

  try {
    const { data } = yield call(postData, {
      url: CONFIRM_RESET_PASSWORD,
      data: formData,
    });

    if (data) {
      yield put(resetPasswordSuccess(data));
      callback();
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(resetPasswordFailed(message));
  }
}

export function* getRoles() {
  try {
    const { data } = yield call(getData, {
      url: ROLES,
    });

    if (data) {
      yield put(getRolesSuccess(data));
    }
  } catch (error) {
    const { message = "Something went wrong!" } = error;

    yield put(getRolesFailed(message));
  }
}

export default function* userSaga() {
  yield takeLatest(registerRequest().type, register);
  yield takeLatest(loginRequest().type, login);
  yield takeLatest(getProfileRequest().type, getProfile);
  yield takeLatest(forgotPasswordRequest().type, forgotPassword);
  yield takeLatest(resetPasswordRequest().type, resetPassword);
  yield takeLatest(getRolesRequest().type, getRoles);
}
