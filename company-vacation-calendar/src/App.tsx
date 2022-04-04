import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import RouterConfig from "./navigation/RouterConfig";
import store from "./redux/store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  );
};

App.displayName = "App";
export default App;
