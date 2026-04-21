import {StyleSheet, Platform} from 'react-native';

const THEME = {
  background: '#090D14',
  surface: '#121826',
  card: '#1A2233',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
  accent: '#F7C85D',
  danger: '#FF6B6B',
} as const;

export const watchlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  content: {
    paddingBottom: 100,
  },

  // ─── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 16,
  },
  title: {
    color: THEME.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: THEME.textMuted,
    fontSize: 14,
  },
  countBadge: {
    color: THEME.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },

  // ─── Movie Card ──────────────────────────────────────────────────────────────
  movieCard: {
    flexDirection: 'row',
    backgroundColor: THEME.surface,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  moviePoster: {
    width: 100,
    height: 140,
  },
  movieInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  movieTitle: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  movieGenre: {
    color: THEME.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  movieMeta: {
    color: THEME.textMuted,
    fontSize: 12,
  },
  movieRating: {
    color: THEME.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  removeButton: {
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  removeButtonText: {
    color: THEME.danger,
    fontSize: 20,
  },

  // ─── Empty State ─────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    color: THEME.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    color: THEME.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
