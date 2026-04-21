import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useRoute, useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {CastMember} from '../../home/models/home.model';
import {RootStackParamList} from '../../../navigation/types';
import {useMovieDetailViewModel} from '../viewmodels/useMovieDetailViewModel';
import {useWatchlistStore} from '../../watchlist/store/watchlistStore';
import {detailStyles as styles, BACKDROP_HEIGHT} from './MovieDetailScreen.styles';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;
type MovieDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieDetail'
>;

export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailRouteProp>();
  const navigation = useNavigation<MovieDetailNavigationProp>();
  const movie = route.params?.movie;
  const {addMovie, removeMovie, isInWatchlist} = useWatchlistStore();
  const inWatchlist = movie ? isInWatchlist(movie.id) : false;

  const {
    isSynopsisExpanded,
    genrePills,
    metaLine,
    toggleSynopsis,
    handleWatchTrailer,
    handlePlayMovie,
  } = useMovieDetailViewModel({
    movie,
    onPlayMovie: m =>
      navigation.navigate('VideoPlayer', {streamUrl: m.trailerUrl}),
  });

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không tìm thấy thông tin phim</Text>
        <TouchableOpacity
          style={styles.errorButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.errorButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderCastItem = ({item}: {item: CastMember}) => (
    <View style={styles.castCard}>
      {item.profileUrl ? (
        <Image
          source={{uri: item.profileUrl}}
          style={styles.castAvatar}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.castAvatarFallback}>
          <Text style={styles.castAvatarInitial}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <Text numberOfLines={1} style={styles.castName}>
        {item.name}
      </Text>
      <Text numberOfLines={1} style={styles.castCharacter}>
        {item.character}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* ─── Hero Backdrop ──────────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <Image
            source={{uri: movie.backdropUrl || movie.posterUrl}}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(9, 13, 20, 0.7)', '#090D14']}
            locations={[0, 0.6, 1]}
            style={styles.heroGradient}
          />

          {/* Back button */}
          <View style={styles.backButtonContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── Movie Info ─────────────────────────────────────────────────── */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.metaLine}>{metaLine}</Text>

          {/* Genre Pills */}
          <View style={styles.genreRow}>
            {genrePills.map(genre => (
              <View key={genre} style={styles.genrePill}>
                <Text style={styles.genrePillText}>{genre}</Text>
              </View>
            ))}
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingStarText}>★</Text>
              <Text style={styles.ratingValue}>
                {movie.rating.toFixed(1)}
              </Text>
              <Text style={styles.ratingScale}>/10</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.primaryButton}
              onPress={handlePlayMovie}>
              <Text style={styles.primaryButtonText}>▶  Xem Phim</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.secondaryButton}
              onPress={handleWatchTrailer}>
              <Text style={styles.secondaryButtonText}>🎬  Trailer</Text>
            </TouchableOpacity>
          </View>

          {/* Watchlist Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.secondaryButton,
              {marginBottom: 24, width: '100%'},
              inWatchlist && {backgroundColor: 'rgba(230, 59, 69, 0.15)', borderColor: '#E63B45'},
            ]}
            onPress={() => {
              if (movie) {
                inWatchlist ? removeMovie(movie.id) : addMovie(movie);
              }
            }}>
            <Text style={[
              styles.secondaryButtonText,
              inWatchlist && {color: '#E63B45'},
            ]}>
              {inWatchlist ? '✓  Đã lưu' : '📥  Thêm vào Watchlist'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* ─── Synopsis ───────────────────────────────────────────────── */}
          <View style={styles.synopsisSection}>
            <Text style={styles.sectionTitle}>Nội dung phim</Text>
            <Text
              style={styles.synopsisText}
              numberOfLines={isSynopsisExpanded ? undefined : 3}>
              {movie.synopsis}
            </Text>
            {movie.synopsis.length > 120 && (
              <TouchableOpacity onPress={toggleSynopsis} activeOpacity={0.7}>
                <Text style={styles.readMoreText}>
                  {isSynopsisExpanded ? 'Thu gọn' : 'Xem thêm'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* ─── Cast ───────────────────────────────────────────────────── */}
          {movie.cast && movie.cast.length > 0 && (
            <View style={styles.castSection}>
              <Text style={styles.sectionTitle}>Diễn viên</Text>
              <FlatList
                horizontal
                data={movie.cast}
                keyExtractor={item => item.id}
                renderItem={renderCastItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.castList}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
