import React from "react";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import {useRoute, useNavigation, RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {Movie} from "../../home/models/home.model";
import {RootStackParamList} from "../../../navigation/types";

type MovieDetailRouteProp = RouteProp<RootStackParamList, "MovieDetail">;
type MovieDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MovieDetail"
>;

export default function MovieDetailScreen() {
  const route = useRoute<MovieDetailRouteProp>();
  const navigation = useNavigation<MovieDetailNavigationProp>();

  const movie = route.params?.movie;

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
        source={{uri: movie.backdropUrl || movie.posterUrl}}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.subtitle}>
          Năm: {movie.year} • Đánh giá: ⭐ {movie.rating}
        </Text>

        <Text style={styles.synopsis}>{movie.synopsis}</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              title="▶ Xem Phim (Watch Movie)"
              color="#E63B45"
              onPress={() => navigation.navigate("VideoPlayer")}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="← Trở về (Go Back)"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090D14",
  },
  image: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#E63B45",
    marginBottom: 20,
    fontWeight: "600",
  },
  synopsis: {
    fontSize: 15,
    color: "#CBD5E1",
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 40,
    gap: 15, // Space between buttons
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  errorText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    marginTop: 100,
  },
});
