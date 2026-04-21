import axios, {AxiosError, AxiosInstance} from 'axios';
import {TMDB_CONFIG} from '../tmdb.config';

export const tmdbAxiosClient: AxiosInstance = axios.create({
  baseURL: TMDB_CONFIG.baseUrl,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

// Inject Bearer token when available
tmdbAxiosClient.interceptors.request.use(config => {
  if (TMDB_CONFIG.bearerToken) {
    config.headers.Authorization = `Bearer ${TMDB_CONFIG.bearerToken}`;
  }
  return config;
});

tmdbAxiosClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const serverMessage = (
      error.response?.data as {status_message?: string} | undefined
    )?.status_message;
    const message =
      serverMessage || error.message || 'An unknown network error occurred.';
    return Promise.reject(new Error(`[${status ?? 'NET'}] ${message}`));
  },
);
