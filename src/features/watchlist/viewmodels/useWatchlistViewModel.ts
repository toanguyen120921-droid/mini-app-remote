import {useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import type {Movie} from '../../home/models/home.model';
import {useWatchlistStore} from '../store/watchlistStore';
import type {WatchlistScreenProps} from '../watchlist.types';

export const useWatchlistViewModel = ({onMoviePress}: WatchlistScreenProps) => {
  const {movies, isLoaded, loadFromStorage, removeMovie} = useWatchlistStore();

  useEffect(() => {
    if (!isLoaded) {
      loadFromStorage();
    }
  }, [isLoaded, loadFromStorage]);

  const handleMoviePress = useCallback(
    (movie: Movie) => {
      if (onMoviePress) {
        onMoviePress(movie);
        return;
      }
      Alert.alert(movie.title, `${movie.year} • ${movie.genre.join(' / ')}`);
    },
    [onMoviePress],
  );

  const handleRemoveMovie = useCallback(
    (movie: Movie) => {
      Alert.alert(
        'Xóa khỏi danh sách',
        `Bạn muốn xóa "${movie.title}" khỏi watchlist?`,
        [
          {text: 'Hủy', style: 'cancel'},
          {
            text: 'Xóa',
            style: 'destructive',
            onPress: () => removeMovie(movie.id),
          },
        ],
      );
    },
    [removeMovie],
  );

  return {
    movies,
    isLoaded,
    handleMoviePress,
    handleRemoveMovie,
  };
};
