import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

interface RetryConfig {
  retries?: number;
  retryDelay?: number;
  retryStatusCodes?: number[];
}

type AxiosRequestConfigWithRetry = AxiosRequestConfig & RetryConfig & {
  __retryCount?: number;
};

const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  retries: 2,
  retryDelay: 500,
  retryStatusCodes: [429, 500, 502, 503, 504],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const setupRetryInterceptor = (
  instance: AxiosInstance,
  retryConfig: Required<RetryConfig>
) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as AxiosRequestConfigWithRetry | undefined;
      if (!config) {
        return Promise.reject(error);
      }

      const status = error.response?.status;
      const isRetryableStatus =
        status === undefined || retryConfig.retryStatusCodes.includes(status);

      config.__retryCount = config.__retryCount ?? 0;
      const maxRetries = config.retries ?? retryConfig.retries;
      const delayMs = config.retryDelay ?? retryConfig.retryDelay;

      if (!isRetryableStatus || config.__retryCount >= maxRetries) {
        return Promise.reject(error);
      }

      config.__retryCount += 1;
      await sleep(delayMs * config.__retryCount);
      return instance(config);
    }
  );
};

const createApiClient = (
  baseURL: string,
  options: AxiosRequestConfigWithRetry = {}
) => {
  const { retries, retryDelay, retryStatusCodes, ...axiosOptions } = options;
  const apiClient = axios.create({
    baseURL,
    ...axiosOptions,
  });

  setupRetryInterceptor(apiClient, {
    retries: retries ?? DEFAULT_RETRY_CONFIG.retries,
    retryDelay: retryDelay ?? DEFAULT_RETRY_CONFIG.retryDelay,
    retryStatusCodes:
      retryStatusCodes ?? DEFAULT_RETRY_CONFIG.retryStatusCodes,
  });

  return apiClient;
};

export const cityApi = createApiClient(import.meta.env.VITE_RAPIDAPI_BASE_URL, {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
});

export const weatherApi = createApiClient(import.meta.env.VITE_WEATHER_API_URL);

export const countryApi = createApiClient(import.meta.env.VITE_COUNTRY_API_URL);

export const fsqApi = createApiClient("/api/fsq", {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_FOURSQUARE_KEY}`,
    Accept: "application/json",
    "X-Places-Api-Version": "2025-06-17",
  },
});
