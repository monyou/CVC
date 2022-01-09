import { getToken } from "../services/auth.service";

const baseURL = `${process.env.REACT_APP_API_URL}/api`;

export function GET(endpoint: string, configs: Object = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      } as HeadersInit,
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

export function POST(endpoint: string, body: any, configs: Object = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      } as HeadersInit,
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

export function PUT(endpoint: string, body: any, configs: Object = {}) {
  return window
    .fetch(`${baseURL}${endpoint}`, {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
      } as HeadersInit,
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

const api = {
  GET,
  POST,
  PUT,
};

export default api;
