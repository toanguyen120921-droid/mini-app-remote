import React, {useCallback} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import type {Movie} from '../../home/models/home.model';
import type {WatchlistScreenProps} from '../watchlist.types';
import {useWatchlistViewModel} from '../viewmodels/useWatchlistViewModel';
import {watchlistStyles as styles} from './WatchlistScreen.styles';

export default function WatchlistScreen({
  onMoviePress,
}: WatchlistScreenProps): React.ReactElement {
  const {movies, handleMoviePress, handleRemoveMovie} = useWatchlistViewModel({
    onMoviePress,
  });

  const renderMovieCard = useCallback(
    (movie: Movie) => (
      <TouchableOpacity
        key={movie.id}
        activeOpacity={0.9}
        style={styles.movieCard}
        onPress={() => handleMoviePress(movie)}>
        <Image
          source={{uri: movie.posterUrl}}
          style={styles.moviePoster}
          resizeMode="cover"
        />
        <View style={styles.movieInfo}>
          <Text numberOfLines={2} style={styles.movieTitle}>
            {movie.title}
          </Text>
          <Text numberOfLines={1} style={styles.movieGenre}>
            {movie.genre.join(' • ')}
          </Text>
          <Text style={styles.movieMeta}>
            {movie.year}  •  {movie.duration}
          </Text>
          <Text style={styles.movieRating}>
            ★ {movie.rating.toFixed(1)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveMovie(movie)}
          activeOpacity={0.7}>
          <Text style={styles.removeButtonText}>🗑️</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    ),
    [handleMoviePress, handleRemoveMovie],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#090D14" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>Watchlist</Text>
          <Text style={styles.subtitle}>
            Phim bạn muốn xem sau
          </Text>
          {movies.length > 0 && (
            <Text style={styles.countBadge}>
              {movies.length} phim đã lưu
            </Text>
          )}
        </View>

        {/* ─── Content ────────────────────────────────────────────────── */}
        {movies.length > 0 ? (
          movies.map(renderMovieCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>Chưa có phim nào</Text>
            <Text style={styles.emptyMessage}>
              Thêm phim vào watchlist từ trang chi tiết phim để xem sau nhé!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
