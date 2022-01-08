import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./slices/common.slice";
import userSlice from "./slices/user.slice";

const CVC_REDUX_STORE = "cvc_redux_store";
const previousStoreState = localStorage.getItem(CVC_REDUX_STORE);
const storeConfig = {
  reducer: {
    common: commonSlice,
    user: userSlice,
  },
};

if (previousStoreState) {
  storeConfig.preloadedState = JSON.parse(previousStoreState);
}

const store = configureStore(storeConfig);

store.subscribe(() => {
  localStorage.setItem(CVC_REDUX_STORE, JSON.stringify(store.getState()));
});

export default store;
