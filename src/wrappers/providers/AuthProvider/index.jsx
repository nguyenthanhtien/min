import { useEffect, useMemo, useState, memo } from "react";
import { useMsal } from "@azure/msal-react";
import { PropTypes } from "prop-types";

import { loginRequest } from "@/config/authConfig";

import authContext from "@/services/contexts/authContext";
import axiosInstance from "@/services/api";
import * as localStorageService from "@/services/storage";

import { STATUS_CODES } from "@/utils/constants/statusCode";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorageService.getToken);

  const { instance } = useMsal();

  const handleSetToken = (tk) => {
    localStorageService.setToken(tk);
    setToken(tk);
  };

  const handleRemoveToken = () => {
    localStorageService.removeToken();
    localStorageService.removeLogginUserInfo();
    setToken(null);
    window.location.pathname = "/main";
  };

  const onLogin = () => {
    instance
      .acquireTokenSilent(loginRequest)
      .then((response) => {
        if (response) {
          console.log("acquireTokenSilent: ", response);
          setToken(response.idToken);
        }
      })
      .catch(() => {
        instance
          // .loginPopup({
          //   ...loginRequest,
          //   prompt: "create",
          // })
          .loginRedirect({
            ...loginRequest,
            prompt: "create",
          });
      });
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      onSetToken: handleSetToken,
      onLogout: handleRemoveToken,
      onLogin,
    }),
    [token]
  );

  useEffect(() => {
    if (token) {
      axiosInstance.interceptors.request.use(
        function (config) {
          // Do something before request is sent
          config.headers["Authorization"] = `Bearer ${token}`;
          return config;
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error);
        }
      );

      axiosInstance.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          const errorCode = error.response?.status || error.code;

          switch (errorCode) {
            case STATUS_CODES.UNAUTHORIZED:
            case STATUS_CODES.NETWORK_ERROR:
              if (token) {
                // do something when token expired
                handleRemoveToken();
              } else {
                loginRedirect(
                  `${window.location.pathname}${window.location.search}`
                );
              }
              break;

            default:
              break;
          }
          return Promise.reject(error);
        }
      );
    }
  }, [token]);

  // Provide the authentication context to the children components
  return (
    <authContext.Provider value={contextValue}>{children}</authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default memo(AuthProvider);
