/**
 * TMDB API Configuration
 *
 * To use real TMDB API, set your Bearer token below.
 * Get one free at https://www.themoviedb.org/settings/api
 */

export const TMDB_CONFIG = {
  baseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p',
  /** Set your TMDB Read Access Token (v4 auth) here */
  bearerToken: '',
} as const;

// ─── Image URL Helpers ─────────────────────────────────────────────────────────

export type TmdbImageSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type TmdbBackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

export const buildPosterUrl = (
  path: string | null | undefined,
  size: TmdbImageSize = 'w500',
): string => {
  if (!path) {
    return `https://picsum.photos/seed/movie-fallback/600/900`;
  }
  return `${TMDB_CONFIG.imageBaseUrl}/${size}${path}`;
};

export const buildBackdropUrl = (
  path: string | null | undefined,
  size: TmdbBackdropSize = 'w1280',
): string => {
  if (!path) {
    return `https://picsum.photos/seed/backdrop-fallback/1280/720`;
  }
  return `${TMDB_CONFIG.imageBaseUrl}/${size}${path}`;
};

export const buildProfileUrl = (
  path: string | null | undefined,
  size: TmdbImageSize = 'w185',
): string | undefined => {
  if (!path) {
    return undefined;
  }
  return `${TMDB_CONFIG.imageBaseUrl}/${size}${path}`;
};

export const hasTmdbToken = (): boolean =>
  TMDB_CONFIG.bearerToken.length > 0;
