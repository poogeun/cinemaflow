import axios from "axios";

const api = axios.create({
  baseURL: "http://172.27.42.103:3000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status =
      error.response?.status;

    const isLoginRequest =
      error.config?.url === "/auth/login";

    if (
      status === 401 &&
      !isLoginRequest
    ) {
      localStorage.removeItem(
        "accessToken"
      );

      window.location.replace(
        "/login"
      );
    }

    return Promise.reject(error);
  }
);

export default api;