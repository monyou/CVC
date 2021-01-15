import React from "react";
import { BrowserRouter } from "react-router-dom";
import { RouterConfig } from "./navigation/RouterConfig";

const GlobalContext = React.createContext();
const initialGlobalState = {
  user: null,
  loading: false,
};

function App() {
  const [globalState, setGlobalState] = React.useState(initialGlobalState);

  return (
    <GlobalContext.Provider value={[globalState, setGlobalState]}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export { App, GlobalContext };
