import axios, {AxiosError, AxiosInstance} from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbAxiosClient: AxiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
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
