import {
  SubscribeProps,
  UserFromTokenModel,
} from "./../modules/auth/types/auth.type";
import { LoginProps } from "../modules/auth/types/auth.type";
import * as backendAPI from "../utils/api";

const TOKEN = "cvc_auth_token";

export function login({ email, password }: LoginProps): Promise<any> {
  const loginBody = JSON.stringify({ email, password });

  return backendAPI.POST("/auth/token", loginBody).then((response) => {
    setToken(response.token);
    return getUserFromToken();
  });
}

export function subscribe({
  email,
  firstName,
  lastName,
  name,
  bulstat,
  yearVacationLimit,
}: SubscribeProps): Promise<any> {
  const subscribeBody = JSON.stringify({
    email,
    firstName,
    lastName,
    name,
    bulstat,
    yearVacationLimit,
  });

  return backendAPI.POST("/auth/subscribe", subscribeBody);
}

export function logout(): void {
  window.localStorage.removeItem(TOKEN);
}

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN) || null;
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN, token);
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

const authService = {
  getToken,
  setToken,
  login,
  logout,
  getUserFromToken,
  subscribe,
};

export default authService;
