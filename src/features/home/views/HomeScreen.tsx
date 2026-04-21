import React, {useCallback} from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
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

  const renderSection = ({item}: {item: HomeSection}) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.seeAllButton}
          onPress={() => handleSeeAllPress(item)}
        >
          <Text style={styles.seeAllText}>{HOME_COPY.seeAllLabel}</Text>
          <Text style={styles.chevronIconText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {item.movies.length > 0 ? (
        <FlatList
          horizontal
          data={item.movies}
          keyExtractor={(movie) => movie.id}
          renderItem={renderMovieCard}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviesListContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Nothing here yet</Text>
          <Text style={styles.emptyStateText}>{item.emptyMessage}</Text>
        </View>
      )}
    </View>
  );

  const renderHeader = () => (
    <>
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

      <ContentCarousel
        items={featuredCarouselItems}
        style={styles.carouselSection}
        onItemPress={(item) => {
          if (item.payload) {
            handleMoviePress(item.payload);
          }
        }}
      />

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
    </>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={HOME_THEME.background}
      />
      <FlatList
        data={sections}
        keyExtractor={(section) => section.key}
        renderItem={renderSection}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
