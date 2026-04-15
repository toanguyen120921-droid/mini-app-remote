import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

export type TabKey = 'home' | 'profile';

interface TabItem {
  key: TabKey;
  label: string;
  icon: React.FC<{color: string}>;
}

interface BottomTabBarProps {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
}

const TAB = {
  background: '#0D1320',
  border: 'rgba(255, 255, 255, 0.07)',
  active: '#E63B45',
  inactive: '#4A5568',
  height: Platform.OS === 'ios' ? 80 : 68,
  paddingBottom: Platform.OS === 'ios' ? 22 : 10,
} as const;

const HomeIcon = ({color}: {color: string}) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ProfileIcon = ({color}: {color: string}) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={7} r={4} stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 21C4 17.134 7.58172 14 12 14C16.4183 14 20 17.134 20 21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

const TABS: TabItem[] = [
  {key: 'home', label: 'Home', icon: HomeIcon},
  {key: 'profile', label: 'My Profile', icon: ProfileIcon},
];

export default function BottomTabBar({
  activeTab,
  onTabPress,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = activeTab === tab.key;
        const color = isActive ? TAB.active : TAB.inactive;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.key}
            activeOpacity={0.8}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}>
            <View style={styles.iconWrapper}>
              <Icon color={color} />
              {isActive && <View style={styles.activeDot} />}
            </View>
            <Text
              style={[
                styles.label,
                {color: isActive ? '#F8FAFC' : TAB.inactive},
              ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: TAB.background,
    borderTopColor: TAB.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: TAB.height,
    paddingBottom: TAB.paddingBottom,
    paddingTop: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: TAB.active,
    marginTop: 4,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginTop: 2,
  },
});
