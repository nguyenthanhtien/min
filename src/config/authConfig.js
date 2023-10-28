import config from "./index";

export const msalConfig = {
  auth: {
    clientId: config.CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
    authority: `https://login.microsoftonline.com/${config.TENANT_ID}`, // Replace the placeholder with your tenant subdomain
    redirectUri: `${window.location.origin}/auth/callback`, // You must register this URI on Azure Portal/App Registration.
    postLogoutRedirectUri: `${window.location.origin}/login`, // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};