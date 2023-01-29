import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/v1/',
});

// Handle all configuration of request
api.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = localStorage.getItem("accessToken");
    //     config.headers["lang"] = localStorage.getItem("i18nextLng");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle errors of all responses
api.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err?.message === "Network Error") {
      return Promise.reject(null);
    }
    return Promise.reject(err.response?.data);
  }
);

export default api;
