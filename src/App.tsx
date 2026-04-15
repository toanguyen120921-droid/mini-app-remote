import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, NavigationIndependentTree, useNavigation} from '@react-navigation/native';
import Svg, {Path, Circle} from 'react-native-svg';

import {HomeScreenProps} from './features/home/home.types';
import {HomeSection, Movie} from './features/home/models/home.model';
import HomeScreen from './features/home/views/HomeScreen';
import {ProfileScreenProps} from './features/profile/models/profile.types';
import ProfileScreen from './features/profile/views/ProfileScreen';
import MovieDetailScreen from './features/movies/views/MovieDetailScreen';

export interface AppProps {
  onLoadComplete?: () => void;
  onRequestUpdate?: () => void;
  onMoviePress?: (movie: Movie) => void;
  onSeeAllPress?: (section: HomeSection) => void;
  accountId?: string | number;
  accessToken?: string;
  onAuthMissingPress?: () => void;
  // cờ phân biệt chạy độc lập hay chạy trong host
  isStandalone?: boolean;
  onBack?: () => void;
}

const Tab = createBottomTabNavigator();

// --- Các icon mượn lại tự code ---
const HomeIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({color, size}: {color: string; size: number}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

function MainTabs(props: AppProps) {
  const navigation = useNavigation<any>();

  const homeProps: HomeScreenProps = {
    onLoadComplete: props.onLoadComplete,
    onMoviePress: (movie) => navigation.navigate('MovieDetail', { movie }),
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
        tabBarActiveTintColor: '#E63B45',
        tabBarInactiveTintColor: '#4A5568',
        tabBarStyle: {
          backgroundColor: '#0D1320',
          borderTopColor: 'rgba(255, 255, 255, 0.07)',
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? 22 : 6,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => <HomeIcon color={color} size={22} />,
        }}>
        {() => <HomeScreen {...homeProps} />}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({color, size}) => <ProfileIcon color={color} size={22} />,
        }}>
        {() => <ProfileScreen {...profileProps} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App(props: AppProps): React.ReactElement {
  // NOTE: Bắt buộc dùng thẻ Tab.Navigator trực tiếp hoặc Independent nếu standalone.
  // Ở bản React Navigation V7, thẻ independent={true} bị bỏ đi và thay bằng NavigationIndependentTree
  return (
    <NavigationIndependentTree>
      <NavigationContainer
        onUnhandledAction={(action) => {
          // Bắt sự kiện ấn nút Back cứng trên điện thoại Android (khi stack của Mini app hết chỗ Back)
          if (action.type === 'GO_BACK' && props.onBack) {
            props.onBack();
          }
        }}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
           {/* Trang chính chứa Tab Bar */}
           <Stack.Screen name="MainTabs">
              {() => <MainTabs {...props} />}
           </Stack.Screen>

           {/* Trang lẻ: Movie Detail */}
           <Stack.Screen 
              name="MovieDetail" 
              component={MovieDetailScreen} 
              options={{ 
                headerShown: true, 
                title: "Chi Tiết Phim",
                headerStyle: { backgroundColor: '#090D14' },
                headerTintColor: '#FFF',
              }} 
           />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export default App;
