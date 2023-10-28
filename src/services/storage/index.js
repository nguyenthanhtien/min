const TOKEN_KEY = "f636fb57-b47d-55af-9925-4f640c723802";
const CURRENT_URL_KEY = "74835940-2cf3-56f3-9991-19cc6ca2ff6e";
const LOGGED_IN_USER_INFO = "69416654-2136-4eb7-abe7-ee8ec8fe09ac";

export const setToken = (value) => localStorage.setItem(TOKEN_KEY, value);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
export const setCurrentURL = () => localStorage.removeItem(CURRENT_URL_KEY);
export const getCurrentURL = () => localStorage.removeItem(CURRENT_URL_KEY);
export const removeCurrentURL = () => localStorage.removeItem(CURRENT_URL_KEY);
export const setLogginUserInfo = (userInfo) => localStorage.setItem(LOGGED_IN_USER_INFO, userInfo);
export const getLogginUserInfo = () => localStorage.getItem(LOGGED_IN_USER_INFO);
export const removeLogginUserInfo = () => localStorage.removeItem(LOGGED_IN_USER_INFO);
