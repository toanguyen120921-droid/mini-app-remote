import {tmdbAxiosClient} from '../../../core/http/axiosClient';
import {hasTmdbToken} from '../../../core/tmdb.config';
import {MOVIE_CATALOG} from '../models/home.model';
import {mapTmdbMovieToMovie, mapTmdbDetailToMovie, TmdbMovieListResponse, TmdbMovieDetailResponse} from './tmdbMovie.mapper';
import type {Movie} from '../models/home.model';

// ─── Public API ────────────────────────────────────────────────────────────────

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  if (!hasTmdbToken()) {
    return MOVIE_CATALOG.filter(m => m.isFeatured);
  }

  const {data} = await tmdbAxiosClient.get<TmdbMovieListResponse>(
    '/trending/movie/week',
  );
  return data.results.slice(0, 10).map(mapTmdbMovieToMovie);
};

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  if (!hasTmdbToken()) {
    return [...MOVIE_CATALOG].sort((a, b) => b.popularity - a.popularity);
  }

  const {data} = await tmdbAxiosClient.get<TmdbMovieListResponse>(
    '/movie/popular',
  );
  return data.results.map(mapTmdbMovieToMovie);
};

export const fetchNowPlayingMovies = async (): Promise<Movie[]> => {
  if (!hasTmdbToken()) {
    return [...MOVIE_CATALOG].sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
    );
  }

  const {data} = await tmdbAxiosClient.get<TmdbMovieListResponse>(
    '/movie/now_playing',
  );
  return data.results.map(mapTmdbMovieToMovie);
};

export const fetchMovieDetail = async (movieId: number): Promise<Movie> => {
  if (!hasTmdbToken()) {
    const found = MOVIE_CATALOG.find(m => m.id === String(movieId));
    if (found) {
      return found;
    }
    throw new Error(`Movie ${movieId} not found`);
  }

  const {data} = await tmdbAxiosClient.get<TmdbMovieDetailResponse>(
    `/movie/${movieId}`,
    {params: {append_to_response: 'credits,videos'}},
  );
  return mapTmdbDetailToMovie(data);
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!hasTmdbToken()) {
    const q = query.toLowerCase();
    return MOVIE_CATALOG.filter(
      m =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some(g => g.toLowerCase().includes(q)),
    );
  }

  const {data} = await tmdbAxiosClient.get<TmdbMovieListResponse>(
    '/search/movie',
    {params: {query, include_adult: false}},
  );
  return data.results.map(mapTmdbMovieToMovie);
};
