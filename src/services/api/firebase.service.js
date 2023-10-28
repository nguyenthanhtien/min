import axios from "axios";

GA4_PROPERTY_ID = '';
const axiosInstance = axios.create({
  baseURL: 'https://analyticsdata.googleapis.com/v1beta/properties/',
  "Content-Type": "application/json",
});

export const runReport = async (req) =>
  axiosInstance({
    method: "post",
    url: GA4_PROPERTY_ID + ':runReport',
    data: req,
  });

export const runRealtimeReport = async (req) =>
  axiosInstance({
    method: "post",
    url: GA4_PROPERTY_ID + ':runRealtimeReport',
    data: req,
  });

export const runPivotReport = async (req) =>
  axiosInstance({
    method: "post",
    url: GA4_PROPERTY_ID + ':runPivotReport',
    data: req,
  });


export const batchRunReports = async (req) =>
  axiosInstance({
    method: "post",
    url: GA4_PROPERTY_ID + ':batchRunReports',
    data: req,
  });

export const batchRunPivotReports = async (req) =>
  axiosInstance({
    method: "post",
    url: GA4_PROPERTY_ID + ':batchRunPivotReports',
    data: req,
  });
