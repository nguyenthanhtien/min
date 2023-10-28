import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  userListSelector,
  userDetailSelector,
  facilitatorUsersSelector,
  playerUsersSelector,
  getUserListRequest,
  getUserDetailRequest,
  resetUserDetail,
  updateUserRequest,
  getFacilitatorUsersRequest,
  getPlayerUsersRequest
} from "@/slices/userManagement";

const useUserManagement = () => {
  const dispatch = useDispatch();

  const userList = useSelector(userListSelector);
  const userDetail = useSelector(userDetailSelector);
  const facilitatorUsers = useSelector(facilitatorUsersSelector);
  const playerUsers = useSelector(playerUsersSelector);

  const onGetUserList = useCallback((params) => {
    dispatch(getUserListRequest(params));
  }, []);

  const onGetUserDetail = useCallback((params) => {
    dispatch(getUserDetailRequest(params));
  }, []);

  const onResetUserDetail = useCallback(() => {
    dispatch(resetUserDetail());
  }, []);

  const onUpdateUser = useCallback((params) => {
    dispatch(updateUserRequest(params));
  }, []);

  const onGetFacilitatorUsers = useCallback((params) => {
    dispatch(getFacilitatorUsersRequest(params));
  }, []);

  const onGetPlayerUsers = useCallback((params) => {
    dispatch(getPlayerUsersRequest(params));
  }, []);

  return {
    userList,
    userDetail,
    facilitatorUsers,
    playerUsers,
    onGetUserList,
    onGetUserDetail,
    onResetUserDetail,
    onUpdateUser,
    onGetFacilitatorUsers,
    onGetPlayerUsers
  };
};

export default useUserManagement;
