import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import SplashScreen from "../features/splash/views/SplashScreen";
import MovieDetailScreen from "../features/movies/views/MovieDetailScreen";
import VideoPlayerScreen from "../features/movies/views/VideoPlayerScreen";

import MainTabNavigator from "./MainTabNavigator";
import {AppProps, RootStackParamList} from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator(props: AppProps) {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MainTabs">
        {() => <MainTabNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          headerShown: true,
          title: "Chi Tiết Phim",
          headerStyle: {backgroundColor: "#090D14"},
          headerTintColor: "#FFF",
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
