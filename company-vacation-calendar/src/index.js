import React from "react";
import ReactDOM from "react-dom";
import "styles/index.css";
import * as serviceWorkerRegistration from "utils/serviceWorkerRegistration";
import reportWebVitals from "utils/reportWebVitals";
import App from "App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
