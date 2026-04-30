import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getStorageItem<string>(LOCAL_STORAGE_KEY.accessToken);

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/v1/auth/refresh") {
        removeStorageItem(LOCAL_STORAGE_KEY.accessToken);
        removeStorageItem(LOCAL_STORAGE_KEY.refreshToken);
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getStorageItem<string>(
            LOCAL_STORAGE_KEY.refreshToken,
          );

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          setStorageItem(LOCAL_STORAGE_KEY.accessToken, data.data.accessToken);
          setStorageItem(
            LOCAL_STORAGE_KEY.refreshToken,
            data.data.refreshToken,
          );

          return data.data.accessToken;
        })()
          .catch(() => {
            removeStorageItem(LOCAL_STORAGE_KEY.accessToken);
            removeStorageItem(LOCAL_STORAGE_KEY.refreshToken);
            return "";
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken: string) => {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  },
);
