import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const FunnyEntertainmentIcon = ({ size }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
     {/* Popcorn bucket */}
     <Path d="M20 40 L30 90 L70 90 L80 40 Z" fill="#1A202C" stroke="#E63B45" strokeWidth="4" />
     
     {/* Sọc đỏ trang trí */}
     <Path d="M35 40 L40 90 M50 40 L50 90 M65 40 L60 90" stroke="#E63B45" strokeWidth="3" strokeLinecap="round" />
     
     {/* Bắp rang bơ vàng gold */}
     <Circle cx="30" cy="35" r="12" fill="#F6E05E" />
     <Circle cx="50" cy="25" r="15" fill="#F6E05E" />
     <Circle cx="70" cy="35" r="12" fill="#F6E05E" />
     <Circle cx="40" cy="20" r="12" fill="#D69E2E" />
     <Circle cx="60" cy="20" r="12" fill="#D69E2E" />
     
     {/* Mắt lác (Derpy Eyes) hài hước */}
     <Circle cx="40" cy="60" r="7" fill="#fff" />
     <Circle cx="60" cy="60" r="7" fill="#fff" />
     <Circle cx="42" cy="62" r="3" fill="#000" />
     <Circle cx="58" cy="58" r="3" fill="#000" />
     
     {/* Miệng há hốc cute */}
     <Path d="M42 75 Q50 88 58 75" fill="#E53E3E" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hiệu ứng hiện dần và phóng to nhẹ
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    // Hiệu ứng giật nảy liên tục cho icon bắp rang bơ
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -15,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Chuyển hướng sau thời gian ngắn
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [bounceAnim, fadeAnim, navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.iconContainer, 
          { 
            opacity: fadeAnim, 
            transform: [
              { scale: scaleAnim },
              { translateY: bounceAnim }
            ] 
          }
        ]}
      >
        <FunnyEntertainmentIcon size={140} />
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Siêu Giải Trí
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Bạn sợ à....
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14', // Theme tối giống header của stack
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
    shadowColor: '#E63B45',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    color: '#E63B45',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  subtitle: {
    color: '#A0AEC0',
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'italic',
  },
});
