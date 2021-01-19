import { createStore } from "redux";
import { STORE_STATE_NAME } from "./constants";
import globalReducer from "../redux/reducers/global";

const store = createStore(globalReducer);

store.subscribe(() => {
  localStorage.setItem(STORE_STATE_NAME, JSON.stringify(store.getState()));
});

export { store };
