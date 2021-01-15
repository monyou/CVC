import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { STORE_STATE_NAME } from "./redux/CONSTANTS";

store.subscribe(() => {
  localStorage.setItem(STORE_STATE_NAME, JSON.stringify(store.getState()));
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </Provider>
  );
}

export { App };
