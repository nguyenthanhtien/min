import { combineReducers } from "redux";

import userReducer, { ROOT_STATE_NAME as USER } from "../slices/user";
import tabNavigationReducer, {
  ROOT_STATE_NAME as TAB_NAVIGATION,
} from "../slices/tabNavigation";
import userManagementReducer, {
  ROOT_STATE_NAME as USER_MANAGEMENT,
} from "../slices/userManagement";
import reportManagementReducer, {
  ROOT_STATE_NAME as REPORT_MANAGEMENT,
} from "../slices/reportManagement";

export default function createRootReducer() {
  return combineReducers({
    [USER]: userReducer,
    [TAB_NAVIGATION]: tabNavigationReducer,
    [USER_MANAGEMENT]: userManagementReducer,
    [REPORT_MANAGEMENT]: reportManagementReducer,
  });
}
