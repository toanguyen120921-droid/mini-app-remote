import {useCallback, useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import type {Movie} from '../../home/models/home.model';
import {MOVIE_CATALOG} from '../../home/models/home.model';
import type {SearchScreenProps} from '../search.types';

const DEBOUNCE_MS = 350;

export const useSearchViewModel = ({onMoviePress}: SearchScreenProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const performSearch = useCallback((searchQuery: string, genre: string | null) => {
    const q = searchQuery.toLowerCase().trim();

    let filtered = MOVIE_CATALOG;

    if (genre) {
      filtered = filtered.filter(m =>
        m.genre.some(g => g.toLowerCase() === genre.toLowerCase()),
      );
    }

    if (q.length > 0) {
      filtered = filtered.filter(
        m =>
          m.title.toLowerCase().includes(q) ||
          m.genre.some(g => g.toLowerCase().includes(q)) ||
          m.synopsis.toLowerCase().includes(q),
      );
    }

    setResults(filtered);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length === 0 && !selectedGenre) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      performSearch(query, selectedGenre);
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, selectedGenre, performSearch]);

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      if (onMoviePress) {
        onMoviePress(movie);
        return;
      }

      Alert.alert(
        movie.title,
        `${movie.year} • ${movie.genre.join(' / ')}`,
      );
    },
    [onMoviePress],
  );

  const handleGenrePress = useCallback((genre: string) => {
    setSelectedGenre(prev => (prev === genre ? null : genre));
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery('');
    setSelectedGenre(null);
    setResults([]);
  }, []);

  const showResults = query.trim().length > 0 || selectedGenre !== null;

  return {
    query,
    results,
    isSearching,
    selectedGenre,
    showResults,
    setQuery,
    handleMoviePress,
    handleGenrePress,
    handleClearSearch,
  };
};
