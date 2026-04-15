import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Movie } from '../../home/models/home.model';

export default function MovieDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Lấy dữ liệu movie truyền qua từ tham số route params
  const movie = (route.params as any)?.movie as Movie;

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No movie data found!</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: movie.backdropUrl || movie.posterUrl }} 
        style={styles.image} 
        resizeMode="cover" 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>
          Năm: {movie.year}  •  Đánh giá: ⭐ {movie.rating}
        </Text>
        
        <Text style={styles.synopsis}>{movie.synopsis}</Text>

        <View style={styles.buttonContainer}>
          <Button title="← Trở về (Go Back)" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#E63B45',
    marginBottom: 20,
    fontWeight: '600',
  },
  synopsis: {
    fontSize: 15,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 40,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 100,
  }
});
