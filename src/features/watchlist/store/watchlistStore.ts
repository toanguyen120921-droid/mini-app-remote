import {create} from "zustand";
import {createMMKV} from "react-native-mmkv";
import type {Movie} from "../../home/models/home.model";

const storage = createMMKV({id: "movies-app-watchlist"});
const WATCHLIST_KEY = "watchlist";

const persistWatchlist = (movies: Movie[]) => {
  storage.set(WATCHLIST_KEY, JSON.stringify(movies));
};

const loadWatchlist = (): Movie[] => {
  const raw = storage.getString(WATCHLIST_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as Movie[];
    } catch {
      return [];
    }
  }
  return [];
};

interface WatchlistState {
  movies: Movie[];
  isLoaded: boolean;
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  loadFromStorage: () => Promise<void>;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  movies: loadWatchlist(),
  isLoaded: true,

  addMovie: (movie: Movie) => {
    const current = get().movies;
    if (current.some((m) => m.id === movie.id)) {
      return;
    }
    const updated = [movie, ...current];
    set({movies: updated});
    persistWatchlist(updated);
  },

  removeMovie: (movieId: string) => {
    const updated = get().movies.filter((m) => m.id !== movieId);
    set({movies: updated});
    persistWatchlist(updated);
  },

  isInWatchlist: (movieId: string) => {
    return get().movies.some((m) => m.id === movieId);
  },

  loadFromStorage: async () => {
    const movies = loadWatchlist();
    set({movies, isLoaded: true});
  },
}));
