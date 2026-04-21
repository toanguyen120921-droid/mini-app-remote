import React, {memo} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Movie} from '../models/home.model';
import {styles} from './HomeScreen.styles';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

function MovieCard({movie, onPress}: MovieCardProps): React.ReactElement {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.movieCard}
      onPress={() => onPress(movie)}>
      <Image
        source={{uri: movie.posterUrl}}
        style={styles.moviePoster}
        resizeMode="cover"
      />
      <View style={styles.playButtonOverlay}>
        <View style={styles.playButton}>
          <View style={styles.playTriangle} />
        </View>
      </View>
      <View style={styles.movieInfo}>
        <Text numberOfLines={1} style={styles.movieTitle}>
          {movie.title}
        </Text>
        <Text numberOfLines={1} style={styles.movieGenre}>
          {movie.genre[0]}
        </Text>
        <View style={styles.movieMetaRow}>
          <Text style={styles.movieMetaText}>{movie.year}</Text>
          <Text style={styles.movieRatingText}>
            IMDb {movie.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(MovieCard);
