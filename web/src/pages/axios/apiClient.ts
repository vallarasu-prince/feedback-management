import axios from "axios";

export const api: any = axios.create({
  baseURL: `${process.env.REACT_APP_G_API_URL}/server/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    // Handle errors globally
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("fmToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
