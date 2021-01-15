import {
  LOGIN_USER,
  LOGOUT_USER,
  STORE_STATE_NAME,
  TOGGLE_LOADING,
} from "../CONSTANTS";

function globalReducer(
  state = JSON.parse(localStorage.getItem(STORE_STATE_NAME)),
  action
) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        globalLoading: !state.globalLoading,
      };
    default:
      return state;
  }
}

export { globalReducer };
