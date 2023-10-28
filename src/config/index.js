import { objectToParams } from '@/utils/dataFormat/uriFormat';

const { VITE_BASE_URL, VITE_TENANT_ID, VITE_CLIENT_ID, VITE_CLIENT_SECRET,
  APIKEY, AUTHDOMAIN, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID, MEASUREMENTID } = import.meta.env;
const config = {
  BASE_URL: VITE_BASE_URL,
  TENANT_ID: VITE_TENANT_ID,
  CLIENT_ID: VITE_CLIENT_ID,
  CLIENT_SECRET: VITE_CLIENT_SECRET,
  APIKEY: APIKEY,
  AUTHDOMAIN: AUTHDOMAIN,
  PROJECTID: PROJECTID,
  STORAGEBUCKET: STORAGEBUCKET,
  MESSAGINGSENDERID: MESSAGINGSENDERID,
  APPID: APPID,
  MEASUREMENTID: MEASUREMENTID
};

const queryString = objectToParams({
  redirect_uri: `${window.location.origin}/auth/callback`,
  client_id: config?.CLIENT_ID,
  response_type: 'id_token token',
  scope: 'openid profile',
  state: '0Csr13', // A randomly generated unique value. recommended
  nonce: 'VTTaVx', // A randomly generated unique value. required
});

export const LOGIN_REDIRECT_URL = `https://login.microsoftonline.com/${config?.TENANT_ID}/oauth2/v2.0/authorize${queryString}`;
export const LOGOUT_REDIRECT_URL = `https://login.microsoftonline.com/${config?.TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=${window.location.origin}`;

export default config;
