import {StyleSheet} from 'react-native';

export const DEFAULT_CAROUSEL_HEIGHT = 420;
export const DEFAULT_HORIZONTAL_INSET = 16;

const COLORS = {
  background: '#121826',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  primaryMuted: 'rgba(230, 59, 69, 0.16)',
  accent: '#F7C85D',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
} as const;

export const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageSlide: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tintOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(8, 10, 15, 0.22)',
  },
  topShade: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '32%',
    backgroundColor: 'rgba(8, 10, 15, 0.12)',
  },
  bottomShade: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(8, 10, 15, 0.82)',
    height:'35%',
    padding:12
  },
  fixedOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 14,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: COLORS.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeText: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  trailingBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(8, 10, 15, 0.36)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  trailingBadgeText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
  },
  bottomContent: {
    gap: 9,
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    maxWidth: '84%',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: '92%',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: 8,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    marginRight: 6,
  },
});
