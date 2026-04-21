import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type {Movie} from '../../home/models/home.model';
import {GENRE_CARDS, SEARCH_COPY, SEARCH_THEME} from '../models/search.model';
import type {SearchScreenProps} from '../search.types';
import {useSearchViewModel} from '../viewmodels/useSearchViewModel';
import {searchStyles as styles} from './SearchScreen.styles';

export default function SearchScreen({
  onMoviePress,
}: SearchScreenProps): React.ReactElement {
  const {
    query,
    results,
    isSearching,
    selectedGenre,
    showResults,
    setQuery,
    handleMoviePress,
    handleGenrePress,
    handleClearSearch,
  } = useSearchViewModel({onMoviePress});

  const renderResultCard = useCallback(
    (movie: Movie) => (
      <TouchableOpacity
        key={movie.id}
        activeOpacity={0.9}
        style={styles.resultCard}
        onPress={() => handleMoviePress(movie)}>
        <Image
          source={{uri: movie.posterUrl}}
          style={styles.resultPoster}
          resizeMode="cover"
        />
        <View style={styles.resultInfo}>
          <Text numberOfLines={2} style={styles.resultTitle}>
            {movie.title}
          </Text>
          <Text numberOfLines={1} style={styles.resultGenre}>
            {movie.genre.join(' • ')}
          </Text>
          <Text style={styles.resultMeta}>
            {movie.year}  •  {movie.duration}
          </Text>
          <Text style={styles.resultRating}>
            ★ {movie.rating.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [handleMoviePress],
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={SEARCH_THEME.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        {/* ─── Header ─────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>{SEARCH_COPY.title}</Text>
          <Text style={styles.subtitle}>{SEARCH_COPY.subtitle}</Text>

          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder={SEARCH_COPY.placeholder}
              placeholderTextColor={SEARCH_THEME.textMuted}
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
              returnKeyType="search"
            />
            {(query.length > 0 || selectedGenre) && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearSearch}>
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ─── Results ────────────────────────────────────────────────── */}
        {showResults ? (
          <View style={styles.resultsSection}>
            {isSearching ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={SEARCH_THEME.primary} size="large" />
              </View>
            ) : results.length > 0 ? (
              <>
                <Text style={styles.resultsCount}>
                  {results.length} kết quả
                  {selectedGenre ? ` — ${selectedGenre}` : ''}
                </Text>
                {results.map(renderResultCard)}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🎬</Text>
                <Text style={styles.emptyTitle}>{SEARCH_COPY.emptyTitle}</Text>
                <Text style={styles.emptyMessage}>
                  {SEARCH_COPY.emptyMessage}
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* ─── Genre Grid ─────────────────────────────────────────────── */
          <View style={styles.genresSection}>
            <Text style={styles.genresSectionTitle}>
              {SEARCH_COPY.genresTitle}
            </Text>
            <View style={styles.genreGrid}>
              {GENRE_CARDS.map(genre => (
                <TouchableOpacity
                  key={genre.id}
                  activeOpacity={0.85}
                  style={[
                    styles.genreCard,
                    {backgroundColor: genre.color},
                    selectedGenre === genre.name && styles.genreCardSelected,
                  ]}
                  onPress={() => handleGenrePress(genre.name)}>
                  <Text style={styles.genreEmoji}>{genre.emoji}</Text>
                  <Text style={styles.genreName}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
