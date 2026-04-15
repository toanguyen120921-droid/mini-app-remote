import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {
  DEFAULT_CAROUSEL_HEIGHT,
  DEFAULT_HORIZONTAL_INSET,
  styles,
} from './ContentCarousel.styles';

const DOT_ANIMATION_MS = 240;
const DEFAULT_AUTO_PLAY_DELAY_MS = 4200;

export interface ContentCarouselItem<TPayload = unknown> {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  badgeLabel?: string;
  trailingLabel?: string;
  metaItems?: string[];
  payload?: TPayload;
}

export interface ContentCarouselProps<TPayload = unknown> {
  items: ContentCarouselItem<TPayload>[];
  height?: number;
  horizontalInset?: number;
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayDelayMs?: number;
  style?: StyleProp<ViewStyle>;
  onIndexChange?: (
    index: number,
    item: ContentCarouselItem<TPayload>,
  ) => void;
  onItemPress?: (item: ContentCarouselItem<TPayload>, index: number) => void;
}

const normalizeIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }

  const normalized = index % length;
  return normalized < 0 ? normalized + length : normalized;
};

export default function ContentCarousel<TPayload = unknown>({
  items,
  height = DEFAULT_CAROUSEL_HEIGHT,
  horizontalInset = DEFAULT_HORIZONTAL_INSET,
  initialIndex = 0,
  autoPlay = true,
  autoPlayDelayMs = DEFAULT_AUTO_PLAY_DELAY_MS,
  style,
  onIndexChange,
  onItemPress,
}: ContentCarouselProps<TPayload>): React.ReactElement | null {
  const scrollViewRef = useRef<ScrollView>(null);
  const dotAnimationsRef = useRef<Animated.Value[]>([]);
  const {width: screenWidth} = useWindowDimensions();
  const itemWidth = screenWidth - horizontalInset * 2;
  const canScroll = items.length > 1 && itemWidth > 0;
  const [activeIndex, setActiveIndex] = useState(() =>
    normalizeIndex(initialIndex, items.length),
  );

  dotAnimationsRef.current = items.map(
    (_, index) =>
      dotAnimationsRef.current[index] ??
      new Animated.Value(index === activeIndex ? 1 : 0),
  );

  const activeItem = items[activeIndex];

  const goToIndex = (nextIndex: number, animated = true) => {
    const normalizedIndex = normalizeIndex(nextIndex, items.length);
    const nextItem = items[normalizedIndex];

    setActiveIndex(normalizedIndex);
    scrollViewRef.current?.scrollTo({
      x: normalizedIndex * itemWidth,
      animated,
    });

    if (nextItem) {
      onIndexChange?.(normalizedIndex, nextItem);
    }
  };

  useEffect(() => {
    goToIndex(activeIndex, false);
    // Keep the active slide aligned after rotation or data length changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemWidth, items.length]);

  useEffect(() => {
    dotAnimationsRef.current.forEach((animation, index) => {
      Animated.timing(animation, {
        toValue: index === activeIndex ? 1 : 0,
        duration: DOT_ANIMATION_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    });
  }, [activeIndex, items.length]);

  useEffect(() => {
    if (!autoPlay || !canScroll) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      goToIndex(activeIndex + 1);
    }, autoPlayDelayMs);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, autoPlay, autoPlayDelayMs, canScroll, itemWidth, items.length]);

  if (!activeItem || items.length === 0) {
    return null;
  }

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    if (!canScroll) {
      return;
    }

    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
    goToIndex(nextIndex, false);
  };

  return (
    <View
      style={[
        styles.container,
        {height, marginHorizontal: horizontalInset},
        style,
      ]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={canScroll}
        showsHorizontalScrollIndicator={false}
        contentOffset={{x: activeIndex * itemWidth, y: 0}}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}>
        {items.map(item => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.92}
            style={[styles.imageSlide, {width: itemWidth}]}
            onPress={() => onItemPress?.(activeItem, activeIndex)}>
            <Image
              source={{uri: item.imageUrl}}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View pointerEvents="none" style={styles.tintOverlay} />
      <View pointerEvents="none" style={styles.topShade} />
      <View pointerEvents="none" style={styles.bottomShade} />

      <View pointerEvents="none" style={styles.fixedOverlay}>
        <View style={styles.topRow}>
          {activeItem.badgeLabel ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeItem.badgeLabel}</Text>
            </View>
          ) : (
            <View />
          )}

          {activeItem.trailingLabel ? (
            <View style={styles.trailingBadge}>
              <Text style={styles.trailingBadgeText}>
                {activeItem.trailingLabel}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.bottomContent}>
          <Text style={styles.title}>{activeItem.title}</Text>

          {activeItem.description ? (
            <Text numberOfLines={2} style={styles.description}>
              {activeItem.description}
            </Text>
          ) : null}

          {activeItem.metaItems?.length ? (
            <View style={styles.metaRow}>
              {activeItem.metaItems.map((metaItem, index) => (
                <React.Fragment key={`${activeItem.id}-${metaItem}`}>
                  {index > 0 ? <View style={styles.dotSeparator} /> : null}
                  <Text style={styles.metaText}>{metaItem}</Text>
                </React.Fragment>
              ))}
            </View>
          ) : null}

          <View style={styles.pagination}>
            {items.map((item, index) => {
              const animation = dotAnimationsRef.current[index];

              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.paginationDot,
                    {
                      width: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [6, 34],
                      }),
                      backgroundColor: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          'rgba(255, 255, 255, 0.28)',
                          '#E63B45',
                        ],
                      }),
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
