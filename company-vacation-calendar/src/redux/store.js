import { createStore } from "redux";
import { STORE_STATE_NAME } from "./CONSTANTS";
import { globalReducer } from "../redux/reducers/global";

const initialState = {
  globalLoading: false,
  user: {},
};

if (!window.localStorage.getItem(STORE_STATE_NAME)) {
  window.localStorage.setItem(STORE_STATE_NAME, JSON.stringify(initialState));
}

const store = createStore(globalReducer);

export { store };
