import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {HomeScreenProps} from '../home.types';
import {
  buildCategories,
  buildHomeSections,
  FEATURED_MOVIES,
  HOME_COPY,
  HomeSection,
  MOVIE_CATALOG,
  Movie,
} from '../models/home.model';

export const useHomeViewModel = ({
  onLoadComplete,
  onMoviePress,
  onRequestUpdate,
  onSeeAllPress,
}: HomeScreenProps) => {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleMoviePress = (movie: Movie) => {
    if (onMoviePress) {
      onMoviePress(movie);
      return;
    }

    Alert.alert(
      movie.title,
      `${movie.year} • ${movie.genre.join(' • ')} • ${movie.duration}\n\n${movie.synopsis}`,
    );
  };

  const handleSeeAllPress = (section: HomeSection) => {
    if (onSeeAllPress) {
      onSeeAllPress(section);
      return;
    }

    const titlePreview = section.movies.slice(0, 3).map(movie => movie.title).join(', ');

    Alert.alert(
      section.title,
      titlePreview
        ? `${titlePreview}${section.movies.length > 3 ? '...' : ''}`
        : section.emptyMessage,
    );
  };

  const handleRefreshPress = () => {
    if (onRequestUpdate) {
      onRequestUpdate();
      return;
    }

    Alert.alert(HOME_COPY.reloadTitle, HOME_COPY.reloadDescription);
  };

  return {
    activeCategory,
    categories: buildCategories(MOVIE_CATALOG),
    featuredMovies: FEATURED_MOVIES,
    sections: buildHomeSections(MOVIE_CATALOG, activeCategory),
    showReloadAction: Boolean(onRequestUpdate),
    handleCategoryChange: setActiveCategory,
    handleMoviePress,
    handleSeeAllPress,
    handleRefreshPress,
  };
};
