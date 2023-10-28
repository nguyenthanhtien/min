import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { tabIDs } from "@/utils/constants/tabNavigation";

export const ROOT_STATE_NAME = "tabNavigation";

const initialState = {
  activatedTabId: tabIDs.myProfile,
};

const tabNavigationSlice = createSlice({
  name: ROOT_STATE_NAME,
  initialState,
  reducers: {
    setTabIdRequest(state, action) {
      state.activatedTabId = action.payload || tabIDs.myProfile;
    },
  },
});

const { actions, reducer } = tabNavigationSlice;

export default reducer;

export const { setTabIdRequest } = actions;

export const rootSelector = (state) => state[ROOT_STATE_NAME] || {};

export const activatedTabIdSelector = createSelector(
  rootSelector,
  ({ activatedTabId }) => activatedTabId
);
