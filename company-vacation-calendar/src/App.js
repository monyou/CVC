import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ServerCacheProvider } from "./server-cache/Provider";

function App() {
  return (
    <Provider store={store}>
      <ServerCacheProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </ServerCacheProvider>
    </Provider>
  );
}

export { App };
