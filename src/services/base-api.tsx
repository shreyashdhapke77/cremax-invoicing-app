import axiosInstance from "./axiosInstance";

// const apiBaseUrl = "https://cremax-invoicing-backend.onrender.com/api";

const handleError = (error: any) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      localStorage.clear();
      // window.location.href = "./signup";
    } else if (status === 403 || status === 404) {
      return error.response.data;
    }
    return error.response.data;
  }
  return error;
};

export default class BaseApi {
  static setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
    window.dispatchEvent(new Event("authChanged"));
  }

  static getHeaders(extraHeaders = {}) {
    const token = localStorage.getItem("accessToken");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    };
  }

  static camelToSnake(str: string) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
  
  static convertKeysToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(this.convertKeysToSnakeCase);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc: any, key: string) => {
        const newKey = this.camelToSnake(key);
        acc[newKey] = this.convertKeysToSnakeCase(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  };

  static async get(endpoint: string, extraHeaders = {}, config = {}) {
    try {
      const res = await axiosInstance.get(`${endpoint}`, {
        headers: this.getHeaders(extraHeaders),
        ...config
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async post(endpoint: string, payload: any, extraHeaders = {}, config = {}) {
    try {
      const res = await axiosInstance.post(`${endpoint}`, this.convertKeysToSnakeCase(payload), {
        headers: this.getHeaders(extraHeaders),
        ...config
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async put(endpoint: string, payload: any, extraHeaders = {}, config = {}) {
    try {
      const res = await axiosInstance.put(`${endpoint}`, this.convertKeysToSnakeCase(payload), {
        headers: this.getHeaders(extraHeaders),
        ...config
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }

  static async delete(endpoint: string, extraHeaders = {}, config = {}) {
    try {
      const res = await axiosInstance.delete(`${endpoint}`, {
        headers: this.getHeaders(extraHeaders),
        ...config
      });
      return res.data;
    } catch (error) {
      return handleError(error);
    }
  }
}
