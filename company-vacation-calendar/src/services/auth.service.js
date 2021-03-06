import * as backendAPI from "../utils/backend-api";

const TOKEN = "cvc_auth_token";

function login({ email, password }) {
  const loginBody = JSON.stringify({ email, password });

  return backendAPI.POST("/auth/token", loginBody).then((response) => {
    setToken(response.token);
    return getUserFromToken(response.token);
  });
}

function subscribe({
  email,
  firstName,
  lastName,
  name,
  bulstat,
  yearVacationLimit,
}) {
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

export { getToken, setToken, login, logout, getUserFromToken, subscribe };
