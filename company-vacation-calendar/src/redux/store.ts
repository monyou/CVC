import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./baseApi";
import commonSlice from "./slices/common.slice";
import userSlice from "./slices/user.slice";

export const CVC_REDUX_STORE = "cvc_redux_store";
const previousStoreState = localStorage.getItem(CVC_REDUX_STORE);
const storeConfig = {
  preloadedState: {},
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    common: commonSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(baseApi.middleware),
};

if (previousStoreState) {
  storeConfig.preloadedState = JSON.parse(previousStoreState);
}

const store = configureStore(storeConfig);

setupListeners(store.dispatch);

store.subscribe(() => {
  localStorage.setItem(CVC_REDUX_STORE, JSON.stringify(store.getState()));
});

export default store;
