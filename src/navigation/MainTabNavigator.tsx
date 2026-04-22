import React from "react";
import {StyleSheet, Platform} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useNavigation} from "@react-navigation/native";

import HomeScreen from "../features/home/views/HomeScreen";
import SearchScreen from "../features/search/views/SearchScreen";
import WatchlistScreen from "../features/watchlist/views/WatchlistScreen";
import ProfileScreen from "../features/profile/views/ProfileScreen";
import {HomeScreenProps} from "../features/home/home.types";
import {ProfileScreenProps} from "../features/profile/models/profile.types";

import {AppProps} from "./types";
import {
  HomeIcon,
  SearchIcon,
  BookmarkIcon,
  ProfileIcon,
} from "../icons/TabIcons";

const Tab = createBottomTabNavigator();

const TAB_BAR_STYLE = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0D1320",
    borderTopColor: "rgba(255, 255, 255, 0.07)",
    borderTopWidth: StyleSheet.hairlineWidth,
    height: Platform.OS === "ios" ? 80 : 60,
    paddingBottom: Platform.OS === "ios" ? 22 : 6,
    paddingTop: 6,
  },
});

export default function MainTabNavigator(props: AppProps) {
  const navigation = useNavigation<any>();

  const homeProps: HomeScreenProps = {
    onLoadComplete: props.onLoadComplete,
    onMoviePress: (movie) => navigation.navigate("MovieDetail", {movie}),
    onSeeAllPress: props.onSeeAllPress,
    onRequestUpdate: props.onRequestUpdate,
  };

  const profileProps: ProfileScreenProps = {
    accountId: props.accountId,
    accessToken: props.accessToken,
    onAuthMissingPress: props.onAuthMissingPress,
    onLoadComplete: props.onLoadComplete,
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E63B45",
        tabBarInactiveTintColor: "#4A5568",
        tabBarStyle: TAB_BAR_STYLE.tabBar,
        tabBarLabelStyle: {fontSize: 10, fontWeight: "600"},
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color}) => <HomeIcon color={color} size={22} />,
        }}
      >
        {() => <HomeScreen {...homeProps} />}
      </Tab.Screen>

      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: "Khám phá",
          tabBarIcon: ({color}) => <SearchIcon color={color} size={22} />,
        }}
      >
        {() => (
          <SearchScreen
            onMoviePress={(movie) =>
              navigation.navigate("MovieDetail", {movie})
            }
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Watchlist"
        options={{
          tabBarLabel: "Watchlist",
          tabBarIcon: ({color}) => <BookmarkIcon color={color} size={22} />,
        }}
      >
        {() => (
          <WatchlistScreen
            onMoviePress={(movie) =>
              navigation.navigate("MovieDetail", {movie})
            }
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => <ProfileIcon color={color} size={22} />,
        }}
      >
        {() => <ProfileScreen {...profileProps} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
