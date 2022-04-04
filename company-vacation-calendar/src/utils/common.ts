import { UserFromTokenModel } from "../modules/auth/types/auth.type";
import { CVC_REDUX_STORE } from "../redux/store";

export const AUTH_TOKEN = "cvc_auth_token";

export function logout(): void {
  window.localStorage.removeItem(AUTH_TOKEN);
  window.localStorage.removeItem(CVC_REDUX_STORE);
}

export function getToken(): string | null {
  return window.localStorage.getItem(AUTH_TOKEN) || null;
}

export function setToken(token: string): void {
  window.localStorage.setItem(AUTH_TOKEN, token);
}

export function getUserFromToken(): UserFromTokenModel | null {
  let token = getToken();
  if (token) {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload) as UserFromTokenModel;
  } else {
    return null;
  }
}

const commonFunctions = {
  AUTH_TOKEN,
  getToken,
  setToken,
  logout,
  getUserFromToken,
};

export default commonFunctions;
