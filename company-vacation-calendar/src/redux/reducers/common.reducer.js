import { STORE_STATE_NAME, TOGGLE_LOADING } from "../constants";

export default function commonReducer(
  state = JSON.parse(localStorage.getItem(STORE_STATE_NAME))?.common || {
    globalLoading: false,
  },
  action
) {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        globalLoading: !state.globalLoading,
      };
    default:
      return state;
  }
}
