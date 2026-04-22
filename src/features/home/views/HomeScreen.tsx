import React, {useCallback, useState, useRef} from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ContentCarousel, {
  ContentCarouselItem,
} from "../../../components/ContentCarousel";
import {HomeScreenProps} from "../home.types";
import {HOME_COPY, HOME_THEME, HomeSection, Movie} from "../models/home.model";
import {useHomeViewModel} from "../viewmodels/useHomeViewModel";
import {styles} from "./HomeScreen.styles";
import MovieCard from "./MovieCard";

export default function HomeScreen({
  onLoadComplete,
  onMoviePress,
  onRequestUpdate,
  onSeeAllPress,
}: HomeScreenProps): React.ReactElement {
  const {
    activeCategory,
    categories,
    featuredMovies,
    sections,
    showReloadAction,
    handleCategoryChange,
    handleMoviePress,
    handleRefreshPress,
    handleSeeAllPress,
  } = useHomeViewModel({
    onLoadComplete,
    onMoviePress,
    onRequestUpdate,
    onSeeAllPress,
  });

  const featuredCarouselItems: ContentCarouselItem<Movie>[] =
    featuredMovies.map((movie) => ({
      id: movie.id,
      imageUrl: movie.backdropUrl,
      title: movie.title,
      description: movie.synopsis,
      badgeLabel: HOME_COPY.featuredLabel,
      trailingLabel: `IMDb ${movie.rating.toFixed(1)}`,
      metaItems: [movie.year, movie.genre[0], movie.duration],
      payload: movie,
    }));

  const renderMovieCard = useCallback(
    ({item}: {item: Movie}) => (
      <MovieCard movie={item} onPress={handleMoviePress} />
    ),
    [handleMoviePress],
  );

  const renderSection = (section: HomeSection) => (
    <View key={section.key} style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.seeAllButton}
          onPress={() => handleSeeAllPress(section)}
        >
          <Text style={styles.seeAllText}>{HOME_COPY.seeAllLabel}</Text>
          <Text style={styles.chevronIconText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {section.movies.length > 0 ? (
        <FlatList
          key={`${section.key}-${activeCategory}`}
          horizontal
          data={section.movies}
          keyExtractor={(movie) => movie.id}
          renderItem={renderMovieCard}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviesListContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Nothing here yet</Text>
          <Text style={styles.emptyStateText}>{section.emptyMessage}</Text>
        </View>
      )}
    </View>
  );

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    handleRefreshPress();
    setTimeout(() => setIsRefreshing(false), 800);
  }, [handleRefreshPress]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={HOME_THEME.background}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor="#E63B45"
            colors={['#E63B45']}
            progressBackgroundColor="#121826"
          />
        }
      >
        {/* ─── Header ─────────────────────────────────────────────── */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.eyebrow}>{HOME_COPY.eyebrow}</Text>
            <Text style={styles.screenTitle}>{HOME_COPY.title}</Text>
            <Text style={styles.screenSubtitle}>{HOME_COPY.subtitle}</Text>
          </View>
          {showReloadAction ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.reloadButton}
              onPress={handleRefreshPress}
            >
              <Text style={styles.reloadButtonText}>{HOME_COPY.reloadLabel}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* ─── Featured Carousel ──────────────────────────────────── */}
        <ContentCarousel
          items={featuredCarouselItems}
          style={styles.carouselSection}
          onItemPress={(item) => {
            if (item.payload) {
              handleMoviePress(item.payload);
            }
          }}
        />

        {/* ─── Categories ─────────────────────────────────────────── */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                activeOpacity={0.85}
                style={[
                  styles.categoryPill,
                  activeCategory === category && styles.categoryPillActive,
                ]}
                onPress={() => handleCategoryChange(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === category && styles.categoryTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── Sections ───────────────────────────────────────────── */}
        {sections.map(renderSection)}
      </ScrollView>
    </View>
  );
}
