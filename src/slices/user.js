import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const ROOT_STATE_NAME = "user";

const initialState = {
  forgotPassword: {
    status: "isLoading",
  },
  resetPassword: {
    status: "isLoading",
  },
  loadingToAccount: {
    userEmail: "",
    status: "isLoading",
    error: null,
  },
  profile: {
    data: null,
    status: "isLoading",
    error: null,
  },
  roles: null
};

const userSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    registerRequest(state, action) {
      state.loadingToAccount.userEmail = action.payload.email;
      state.loadingToAccount.status = "isFetching";
      state.loadingToAccount.error = null;
    },
    registerSuccess(state) {
      state.loadingToAccount.status = "hasSucceeded";
      state.loadingToAccount.error = null;
    },
    registerFailed(state, action) {
      state.loadingToAccount.status = "hasFailed";
      state.loadingToAccount.error = action.payload;
    },
    loginRequest(state, action) {
      state.loadingToAccount.userEmail = action.payload.email;
      state.loadingToAccount.status = "isFetching";
      state.loadingToAccount.error = null;
    },
    loginSuccess(state) {
      state.loadingToAccount.status = "hasSucceeded";
      state.loadingToAccount.error = null;
    },
    loginFailed(state, action) {
      state.loadingToAccount.status = "hasFailed";
      state.loadingToAccount.error = action.payload;
    },
    getProfileRequest(state) {
      state.profile.status = "isFetching";
      state.profile.error = null;
    },
    getProfileSuccess(state, action) {
      state.profile.data = action.payload;
      state.profile.status = "hasSucceeded";
      state.profile.error = null;
    },
    getProfileFailed(state, action) {
      state.profile.status = "hasFailed";
      state.profile.error = action.payload;
    },
    forgotPasswordRequest(state) {
      state.forgotPassword.status = "isFetching";
    },
    forgotPasswordSuccess(state) {
      state.forgotPassword.status = "hasSucceeded";
    },
    forgotPasswordFailed(state) {
      state.forgotPassword.status = "hasFailed";
    },
    forgotPasswordResetState(state) {
      state.forgotPassword.status = "isLoading";
    },
    resetPasswordRequest(state) {
      state.resetPassword.status = "isFetching";
    },
    resetPasswordSuccess(state) {
      state.resetPassword.status = "hasSucceeded";
    },
    resetPasswordFailed(state) {
      state.resetPassword.status = "hasFailed";
    },
    getRolesRequest() {},
    getRolesSuccess(state, action) {
      state.roles = action.payload;
    },
    getRolesFailed() {},
  },
});

const { actions, reducer } = userSlice;

export default reducer;

export const {
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
  forgotPasswordResetState,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  getRolesRequest,
  getRolesSuccess,
  getRolesFailed
} = actions;

// Create and export each selector create by name
export const rootSelector = (state) => state[ROOT_STATE_NAME] || {};

export const submitInfoSelector = createSelector(
  rootSelector,
  ({ loadingToAccount }) => loadingToAccount
);

export const profileSelector = createSelector(
  rootSelector,
  ({ profile }) => profile
);

export const forgotPasswordSelector = createSelector(
  rootSelector,
  ({ forgotPassword }) => forgotPassword
);

export const rolesSelector = createSelector(
  rootSelector,
  ({ roles }) => roles
);
