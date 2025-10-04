/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, setAccessToken } from '../auth/tokenStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // importante para enviar la cookie del refresh token
});

// =======================
// Cola de requests fallidas
// =======================
type FailedRequest = {
  resolve: (config: AxiosRequestConfig) => void;
  reject: (error: any) => void;
  config: AxiosRequestConfig;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (prom.config.headers) {
        prom.config.headers.Authorization = `Bearer ${token}`;
      }
      prom.resolve(prom.config);
    }
  });
  failedQueue = [];
};

// =======================
// Interceptor de request
// =======================
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =======================
// Interceptor de response
// =======================
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err) => {
    const originalConfig: AxiosRequestConfig & { _retry?: boolean } = err.config;

    if (err.response?.status === 401 && !originalConfig._retry) {
      if (isRefreshing) {
        // Ya hay un refresh en progreso → encolar esta request
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (cfg) => resolve(api(cfg)),
            reject,
            config: originalConfig,
          });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;
        setAccessToken(newToken);

        processQueue(null, newToken);

        if (originalConfig.headers) {
          originalConfig.headers.Authorization = `Bearer ${newToken}`;
        }

        return api(originalConfig);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.warn(
            'Refresh token inválido o expirado. Redirigiendo al login...'
        );

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
