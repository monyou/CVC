import { getToken } from "../services/auth.service";

const baseURL = `${process.env.REACT_APP_API_URL}/api`;

function GET(endpoint, configs = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      },
      ...configs,
    })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

function POST(endpoint, body, configs = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      },
      ...configs,
    })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

function PUT(endpoint, body, configs = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      },
      ...configs,
    })
    .then(async (response) => {
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { GET, POST, PUT };
