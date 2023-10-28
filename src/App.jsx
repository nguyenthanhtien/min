import { Provider } from "react-redux";
import { MsalProvider } from "@azure/msal-react";

import AuthProvider from "@/wrappers/providers/AuthProvider";
import Routes from "@/routes/Routes";

import configureAppStore from "./stores/configureAppStore";
const store = configureAppStore();

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <AuthProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;
