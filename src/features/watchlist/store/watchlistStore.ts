import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Movie} from '../../home/models/home.model';

const WATCHLIST_STORAGE_KEY = '@movies_app/watchlist';

interface WatchlistState {
  movies: Movie[];
  isLoaded: boolean;
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  loadFromStorage: () => Promise<void>;
}

const persistWatchlist = (movies: Movie[]) => {
  AsyncStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(movies)).catch(
    () => {},
  );
};

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  movies: [],
  isLoaded: false,

  addMovie: (movie: Movie) => {
    const current = get().movies;
    if (current.some(m => m.id === movie.id)) {
      return;
    }
    const updated = [movie, ...current];
    set({movies: updated});
    persistWatchlist(updated);
  },

  removeMovie: (movieId: string) => {
    const updated = get().movies.filter(m => m.id !== movieId);
    set({movies: updated});
    persistWatchlist(updated);
  },

  isInWatchlist: (movieId: string) => {
    return get().movies.some(m => m.id === movieId);
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Movie[];
        set({movies: parsed, isLoaded: true});
      } else {
        set({isLoaded: true});
      }
    } catch {
      set({isLoaded: true});
    }
  },
}));
