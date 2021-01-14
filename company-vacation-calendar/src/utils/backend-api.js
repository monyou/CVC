import { getToken } from "../services/auth.service";

const baseURL = process.env.REACT_APP_API_URL;

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

function POST(endpoint, data, configs = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
        "Content-Type": "application/json",
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

export { GET, POST };
