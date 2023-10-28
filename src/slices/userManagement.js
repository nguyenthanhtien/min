import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const ROOT_STATE_NAME = "userManagement";

const initialState = {
  userList: {
    data: [],
    status: "isLoading",
  },
  playerUsers: [],
  facilitatorUsers: [],
  userDetail: {
    data: {},
    status: "isLoading",
  },
};

const userManagementSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    getUserListRequest(state) {
      state.userList.status = "isFetching";
    },
    getUserListSuccess(state, action) {
      state.userList.data = action.payload;
      state.userList.status = "hasSucceeded";
    },
    getUserListFailed(state) {
      state.userList.status = "hasFailed";
    },
    getUserDetailRequest(state) {
      state.userDetail.status = "isFetching";
    },
    getUserDetailSuccess(state, action) {
      state.userDetail.data = action.payload;
      state.userDetail.status = "hasSucceeded";
    },
    getUserDetailFailed(state) {
      state.userDetail.status = "hasFailed";
    },
    resetUserDetail(state) {
      state.userDetail.data = {};
      state.userDetail.status = "isLoading";
    },
    updateUserRequest() {},
    updateUserSuccess() {},
    updateUserFailed() {},
    getPlayerUsersRequest() {},
    getPlayerUsersSuccess(state, action) {
      state.playerUsers = action.payload;
    },
    getPlayerUsersFailed() {},
    getFacilitatorUsersRequest() {},
    getFacilitatorUsersSuccess(state, action) {
      state.facilitatorUsers = action.payload;
    },
    getFacilitatorUsersFailed() {},
  },
});

const { actions, reducer } = userManagementSlice;

export default reducer;

export const {
  getUserListRequest,
  getUserListSuccess,
  getUserListFailed,
  getUserDetailRequest,
  getUserDetailSuccess,
  getUserDetailFailed,
  resetUserDetail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  getPlayerUsersRequest,
  getPlayerUsersSuccess,
  getPlayerUsersFailed,
  getFacilitatorUsersRequest,
  getFacilitatorUsersSuccess,
  getFacilitatorUsersFailed,
} = actions;

export const rootSelector = (state) => state[ROOT_STATE_NAME] || {};

export const userListSelector = createSelector(
  rootSelector,
  ({ userList }) => userList
);

export const userDetailSelector = createSelector(
  rootSelector,
  ({ userDetail }) => userDetail
);

export const facilitatorUsersSelector = createSelector(
  rootSelector,
  ({ facilitatorUsers }) => facilitatorUsers
);

export const playerUsersSelector = createSelector(
  rootSelector,
  ({ playerUsers }) => playerUsers
);
