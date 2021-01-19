import { logout } from "../../services/auth.service";
import { LOGIN_USER, LOGOUT_USER } from "../constants";

function loginUserAction(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

function logoutUserAction() {
  logout();

  return {
    type: LOGOUT_USER,
  };
}

export { loginUserAction, logoutUserAction };
