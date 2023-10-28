import axios from "axios";

import config from "@/config";

const axiosInstance = axios.create({
  baseURL: config.BASE_URL || window.location.origin,
  "Content-Type": "application/json",
});

export const setHeader = async () => {
  return {};
};

export const getData = async ({ url, params }) =>
  axiosInstance({
    method: "get",
    headers: await setHeader(),
    url,
    params,
  }).catch((error) => console.log(error));

export const postData = async ({ url, data }) =>
  axiosInstance({
    method: "post",
    headers: await setHeader(),
    url,
    data,
  }).catch((error) => console.log(error));

export const putData = async ({ url, data }) =>
  axiosInstance({
    method: "put",
    headers: await setHeader(),
    url,
    data,
  }).catch((error) => console.log(error));

export default axiosInstance;
