import { LOGIN_USER, LOGOUT_USER, STORE_STATE_NAME } from "../constants";

export default function userReducer(
  state = JSON.parse(localStorage.getItem(STORE_STATE_NAME))?.user || {},
  action
) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...action.user,
      };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
