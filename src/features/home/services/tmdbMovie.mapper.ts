import {buildPosterUrl, buildBackdropUrl, buildProfileUrl} from '../../../core/tmdb.config';
import type {Movie, CastMember} from '../models/home.model';

// ─── TMDB API Response Types ───────────────────────────────────────────────────

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
}

export interface TmdbMovieListResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

interface TmdbCast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface TmdbVideo {
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface TmdbMovieDetailResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  runtime: number | null;
  genres: TmdbGenre[];
  credits?: {
    cast: TmdbCast[];
  };
  videos?: {
    results: TmdbVideo[];
  };
}

// ─── Genre ID → Name Lookup ────────────────────────────────────────────────────

const GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// ─── Mappers ───────────────────────────────────────────────────────────────────

const formatRuntime = (minutes: number | null | undefined): string => {
  if (!minutes) {
    return '';
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const extractYear = (releaseDate: string | undefined): string => {
  if (!releaseDate) {
    return '';
  }
  return releaseDate.substring(0, 4);
};

const findTrailerUrl = (videos?: {results: TmdbVideo[]}): string | undefined => {
  if (!videos?.results?.length) {
    return undefined;
  }

  const trailer =
    videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official) ||
    videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') ||
    videos.results.find(v => v.site === 'YouTube');

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined;
};

export const mapTmdbMovieToMovie = (tmdb: TmdbMovie): Movie => ({
  id: String(tmdb.id),
  tmdbId: tmdb.id,
  title: tmdb.title,
  year: extractYear(tmdb.release_date),
  genre: tmdb.genre_ids.map(id => GENRE_MAP[id] || 'Unknown').slice(0, 3),
  duration: '',
  rating: Math.round(tmdb.vote_average * 10) / 10,
  popularity: tmdb.popularity,
  releaseDate: tmdb.release_date || '',
  synopsis: tmdb.overview,
  posterUrl: buildPosterUrl(tmdb.poster_path),
  backdropUrl: buildBackdropUrl(tmdb.backdrop_path),
  isFeatured: tmdb.popularity > 80,
});

export const mapTmdbDetailToMovie = (tmdb: TmdbMovieDetailResponse): Movie => ({
  id: String(tmdb.id),
  tmdbId: tmdb.id,
  title: tmdb.title,
  year: extractYear(tmdb.release_date),
  genre: tmdb.genres?.map(g => g.name).slice(0, 3) || [],
  duration: formatRuntime(tmdb.runtime),
  rating: Math.round(tmdb.vote_average * 10) / 10,
  popularity: tmdb.popularity,
  releaseDate: tmdb.release_date || '',
  synopsis: tmdb.overview,
  posterUrl: buildPosterUrl(tmdb.poster_path),
  backdropUrl: buildBackdropUrl(tmdb.backdrop_path),
  trailerUrl: findTrailerUrl(tmdb.videos),
  cast: tmdb.credits?.cast?.slice(0, 10).map(c => ({
    id: String(c.id),
    name: c.name,
    character: c.character,
    profileUrl: buildProfileUrl(c.profile_path),
  })),
});
