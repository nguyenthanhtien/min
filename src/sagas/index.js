import { all } from 'redux-saga/effects';

import userSaga from './userSaga';
import userManagementSaga from './userManagement';
import reportManagementSaga from './reportManagement';

export default function* rootSaga() {
  yield all([
    userSaga(),
    userManagementSaga(),
    reportManagementSaga(),
  ]);
}
