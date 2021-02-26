import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import * as serviceWorkerRegistration from "./utils/service-worker-registration";
import reportWebVitals from "./utils/report-web-vitals";
import PrimeReact from "primereact/api";
import { App } from "./App";
import moment from "moment";
import "moment/locale/bg";
import { addLocale } from "primereact/api";
moment().locale("bg");
addLocale("bg", {
  firstDayOfWeek: 1,
  dayNames: [
    "неделя",
    "понеделник",
    "вторник",
    "сряда",
    "четвъртък",
    "петък",
    "събота",
  ],
  dayNamesShort: ["нед", "пон", "вто", "сря", "чет", "пет", "съб"],
  dayNamesMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Съ"],
  monthNames: [
    "януари",
    "февруари",
    "март",
    "април",
    "май",
    "юни",
    "юли",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
  ],
  monthNamesShort: [
    "яну",
    "фев",
    "мар",
    "апр",
    "май",
    "юни",
    "юли",
    "авг",
    "сеп",
    "окт",
    "ное",
    "дек",
  ],
  today: "Днес",
  clear: "Изчисти",
});
PrimeReact.ripple = true;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
reportWebVitals();
