import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import * as serviceWorkerRegistration from "./utils/service-worker-registration";
import reportWebVitals from "./utils/report-web-vitals";
import PrimeReact from "primereact/api";
import { App } from "./App";
import moment from "moment";
import "moment/locale/bg";
moment().locale("bg");

PrimeReact.ripple = true;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
reportWebVitals();
