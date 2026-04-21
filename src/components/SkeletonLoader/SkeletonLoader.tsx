import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';

// ─── Shimmer Bar ───────────────────────────────────────────────────────────────

interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: ViewStyle;
}

function SkeletonBar({width, height, borderRadius = 8, style}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: '#1A2233',
          opacity,
        },
        style,
      ]}
    />
  );
}

// ─── Movie Card Skeleton ───────────────────────────────────────────────────────

export function MovieCardSkeleton() {
  return (
    <View style={skeletonStyles.movieCard}>
      <SkeletonBar width={146} height={208} borderRadius={18} />
      <View style={skeletonStyles.movieCardInfo}>
        <SkeletonBar width={110} height={14} />
        <SkeletonBar width={70} height={12} style={{marginTop: 8}} />
        <View style={skeletonStyles.movieCardMetaRow}>
          <SkeletonBar width={40} height={10} />
          <SkeletonBar width={50} height={10} />
        </View>
      </View>
    </View>
  );
}

// ─── Home Section Skeleton ─────────────────────────────────────────────────────

export function HomeSectionSkeleton() {
  return (
    <View style={skeletonStyles.section}>
      <View style={skeletonStyles.sectionHeader}>
        <SkeletonBar width={140} height={20} />
        <SkeletonBar width={60} height={14} />
      </View>
      <View style={skeletonStyles.movieRow}>
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </View>
    </View>
  );
}

// ─── Carousel Skeleton ─────────────────────────────────────────────────────────

export function CarouselSkeleton() {
  return (
    <View style={skeletonStyles.carousel}>
      <SkeletonBar width="100%" height={220} borderRadius={20} />
      <View style={skeletonStyles.carouselDots}>
        <SkeletonBar width={34} height={6} borderRadius={3} />
        <SkeletonBar width={6} height={6} borderRadius={3} />
        <SkeletonBar width={6} height={6} borderRadius={3} />
        <SkeletonBar width={6} height={6} borderRadius={3} />
      </View>
    </View>
  );
}

// ─── Full Home Skeleton ────────────────────────────────────────────────────────

export function HomeScreenSkeleton() {
  return (
    <View style={skeletonStyles.container}>
      {/* Title area */}
      <View style={skeletonStyles.titleArea}>
        <SkeletonBar width={100} height={11} />
        <SkeletonBar width={180} height={28} style={{marginTop: 8}} />
        <SkeletonBar width={240} height={14} style={{marginTop: 6}} />
      </View>

      {/* Carousel */}
      <CarouselSkeleton />

      {/* Categories */}
      <View style={skeletonStyles.categoriesRow}>
        <SkeletonBar width={50} height={36} borderRadius={999} />
        <SkeletonBar width={70} height={36} borderRadius={999} />
        <SkeletonBar width={80} height={36} borderRadius={999} />
        <SkeletonBar width={65} height={36} borderRadius={999} />
      </View>

      {/* Sections */}
      <HomeSectionSkeleton />
      <HomeSectionSkeleton />
    </View>
  );
}

// ─── Detail Skeleton ───────────────────────────────────────────────────────────

export function MovieDetailSkeleton() {
  return (
    <View style={skeletonStyles.container}>
      <SkeletonBar width="100%" height={380} borderRadius={0} />
      <View style={{padding: 20, marginTop: -60}}>
        <SkeletonBar width="80%" height={28} />
        <SkeletonBar width="60%" height={14} style={{marginTop: 12}} />
        <View style={{flexDirection: 'row', gap: 8, marginTop: 16}}>
          <SkeletonBar width={70} height={30} borderRadius={999} />
          <SkeletonBar width={80} height={30} borderRadius={999} />
          <SkeletonBar width={60} height={30} borderRadius={999} />
        </View>
        <View style={{flexDirection: 'row', gap: 12, marginTop: 24}}>
          <SkeletonBar width="48%" height={48} borderRadius={14} />
          <SkeletonBar width="48%" height={48} borderRadius={14} />
        </View>
        <SkeletonBar width="100%" height={80} style={{marginTop: 28}} />
      </View>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const skeletonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  titleArea: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 10,
  },
  carousel: {
    marginHorizontal: 16,
    marginTop: 10,
  },
  carouselDots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
    justifyContent: 'center',
  },
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 22,
  },
  section: {
    marginTop: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  movieRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  movieCard: {
    width: 146,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#141C2A',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  movieCardInfo: {
    padding: 12,
  },
  movieCardMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SkeletonBar;
