import axios from "axios";

const apiBaseUrl = "https://cremax-invoicing-backend.onrender.com/";

const handleError = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      localStorage.clear();
      window.location.href = "./signup";
    } else if (status === 403 || status === 404) {
      return error.response;
    }
    return error.response;
  }
  return error;
};

export default class BaseApi {
  static setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
    window.dispatchEvent(new Event("authChanged"));
  }

  static getHeaders(extraHeaders = {}) {
    const token = localStorage.getItem("access_token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    };
  }

  static async get(endpoint: string, extraHeaders = {}) {
    try {
      const res = await axios.get(`${apiBaseUrl}${endpoint}`, {
        headers: this.getHeaders(extraHeaders),
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async post(endpoint: string, payload: any, extraHeaders = {}) {
    try {
      const res = await axios.post(`${apiBaseUrl}${endpoint}`, payload, {
        headers: this.getHeaders(extraHeaders),
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async put(endpoint: string, payload: any, extraHeaders = {}) {
    try {
      const res = await axios.put(`${apiBaseUrl}${endpoint}`, payload, {
        headers: this.getHeaders(extraHeaders),
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async delete(endpoint: string, extraHeaders = {}) {
    try {
      const res = await axios.delete(`${apiBaseUrl}${endpoint}`, {
        headers: this.getHeaders(extraHeaders),
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }
}
