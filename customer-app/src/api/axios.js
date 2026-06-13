import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://172.27.42.103:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken =
      await SecureStore.getItemAsync(
        "accessToken"
      );
    
    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status =
      error.response?.status;

    const isLoginRequest =
      error.config?.url === "/auth/login";

    if (
      status === 401 &&
      !isLoginRequest
    ) {
      await SecureStore.deleteItemAsync(
        "accessToken"
      );

      router.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;