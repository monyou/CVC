import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import RouterConfig from "./navigation/RouterConfig";
import ServerCacheProvider from "./server-cache/Provider";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ServerCacheProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </ServerCacheProvider>
    </Provider>
  );
};

App.displayName = "App";
export default App;
