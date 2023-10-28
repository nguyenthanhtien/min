import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRoleNames } from "@/utils/user";

import {
  forgotPasswordSelector,
  submitInfoSelector,
  profileSelector,
  rolesSelector,
  registerRequest,
  loginRequest,
  getProfileRequest,
  forgotPasswordRequest,
  forgotPasswordResetState,
  resetPasswordRequest,
  getRolesRequest,
} from "@/slices/user";

const useUser = () => {
  const dispatch = useDispatch();

  const forgotPassword = useSelector(forgotPasswordSelector);
  const submitInfo = useSelector(submitInfoSelector);
  const profile = useSelector(profileSelector);
  const roles = useSelector(rolesSelector);

  const isAdmin = useMemo(() => {
    const userRoles = getRoleNames({ roles, roleIDs: profile.data?.roles });
    return userRoles.includes("Administrator");
  }, [roles, profile]);

  const onRegister = useCallback((params) => {
    dispatch(registerRequest(params));
  }, []);

  const onLogin = useCallback((params) => {
    dispatch(loginRequest(params));
  }, []);

  const onForgotPassword = useCallback((params) => {
    dispatch(forgotPasswordRequest(params));
  }, []);

  const onForgotPasswordResetState = useCallback(() => {
    dispatch(forgotPasswordResetState());
  }, []);

  const onResetPassword = useCallback((params) => {
    dispatch(resetPasswordRequest(params));
  }, []);

  const onGetProfile = useCallback(() => {
    dispatch(getProfileRequest());
  }, []);

  const onGetRoles = useCallback(() => {
    dispatch(getRolesRequest());
  }, []);

  return {
    forgotPassword,
    submitInfo,
    profile,
    roles,
    isAdmin,
    onRegister,
    onLogin,
    onForgotPassword,
    onForgotPasswordResetState,
    onResetPassword,
    onGetProfile,
    onGetRoles
  };
};

export default useUser;
