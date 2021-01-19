import * as backendAPI from "../utils/backend-api";

const TOKEN = "AUTH_TOKEN";

function login({ email, password }) {
  return backendAPI
    .POST("/auth/token", { email, password })
    .then((response) => {
      setToken(response.token);
      return getUserFromToken(response.token);
    });
}

function logout() {
  window.localStorage.removeItem(TOKEN);
}

function getToken() {
  return window.localStorage.getItem(TOKEN) || null;
}

function setToken(token) {
  window.localStorage.setItem(TOKEN, token);
}

function getUserFromToken() {
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

    return JSON.parse(jsonPayload);
  } else {
    return null;
  }
}

export { getToken, setToken, login, logout, getUserFromToken };
