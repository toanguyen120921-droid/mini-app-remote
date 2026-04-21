import {useState, useCallback, useMemo} from 'react';
import {Alert} from 'react-native';
import type {Movie} from '../../home/models/home.model';

interface UseMovieDetailViewModelParams {
  movie: Movie | undefined;
  onWatchTrailer?: (movie: Movie) => void;
  onPlayMovie?: (movie: Movie) => void;
}

export const useMovieDetailViewModel = ({
  movie,
  onWatchTrailer,
  onPlayMovie,
}: UseMovieDetailViewModelParams) => {
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  const toggleSynopsis = useCallback(() => {
    setIsSynopsisExpanded(prev => !prev);
  }, []);

  const handleWatchTrailer = useCallback(() => {
    if (!movie) {
      return;
    }

    if (onWatchTrailer) {
      onWatchTrailer(movie);
      return;
    }

    if (movie.trailerUrl) {
      Alert.alert('Trailer', `Opening: ${movie.trailerUrl}`);
    } else {
      Alert.alert('Trailer', 'No trailer available for this movie.');
    }
  }, [movie, onWatchTrailer]);

  const handlePlayMovie = useCallback(() => {
    if (!movie) {
      return;
    }

    if (onPlayMovie) {
      onPlayMovie(movie);
      return;
    }
  }, [movie, onPlayMovie]);

  const genrePills = useMemo(() => movie?.genre ?? [], [movie]);

  const metaLine = useMemo(() => {
    if (!movie) {
      return '';
    }
    const parts = [movie.year, movie.duration, `⭐ ${movie.rating.toFixed(1)}`].filter(Boolean);
    return parts.join('  •  ');
  }, [movie]);

  return {
    isSynopsisExpanded,
    genrePills,
    metaLine,
    toggleSynopsis,
    handleWatchTrailer,
    handlePlayMovie,
  };
};
