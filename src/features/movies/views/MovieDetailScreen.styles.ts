import {StyleSheet, Platform} from 'react-native';

const THEME = {
  bg: '#090D14',
  surface: '#121826',
  card: '#1A2233',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  primaryMuted: 'rgba(230, 59, 69, 0.15)',
  accent: '#F7C85D',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
} as const;

export const BACKDROP_HEIGHT = 380;

export const detailStyles = StyleSheet.create({
  // ─── Container ────────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: THEME.bg,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ─── Hero Section ─────────────────────────────────────────────────────────────
  heroContainer: {
    height: BACKDROP_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: BACKDROP_HEIGHT * 0.65,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 16,
    left: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginTop: -2,
  },

  // ─── Movie Info ───────────────────────────────────────────────────────────────
  infoContainer: {
    paddingHorizontal: 20,
    marginTop: -60,
    zIndex: 5,
  },
  title: {
    color: THEME.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  metaLine: {
    color: THEME.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },

  // ─── Genre Pills ─────────────────────────────────────────────────────────────
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  genrePill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: THEME.surface,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  genrePillText: {
    color: THEME.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },

  // ─── Rating Badge ────────────────────────────────────────────────────────────
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  ratingStarText: {
    color: THEME.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  ratingValue: {
    color: THEME.text,
    fontSize: 16,
    fontWeight: '800',
  },
  ratingScale: {
    color: THEME.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },

  // ─── Action Buttons ──────────────────────────────────────────────────────────
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.primary,
    paddingVertical: 15,
    borderRadius: 14,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.surface,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: THEME.border,
    gap: 8,
  },
  secondaryButtonText: {
    color: THEME.text,
    fontSize: 15,
    fontWeight: '700',
  },

  // ─── Synopsis ────────────────────────────────────────────────────────────────
  sectionTitle: {
    color: THEME.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  synopsisText: {
    color: THEME.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  readMoreText: {
    color: THEME.primary,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  synopsisSection: {
    marginBottom: 28,
  },

  // ─── Cast ────────────────────────────────────────────────────────────────────
  castSection: {
    marginBottom: 28,
  },
  castList: {
    paddingRight: 20,
  },
  castCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  castAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.card,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: THEME.border,
  },
  castAvatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.card,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: THEME.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castAvatarInitial: {
    color: THEME.textMuted,
    fontSize: 22,
    fontWeight: '700',
  },
  castName: {
    color: THEME.text,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  castCharacter: {
    color: THEME.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },

  // ─── Error ───────────────────────────────────────────────────────────────────
  errorContainer: {
    flex: 1,
    backgroundColor: THEME.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorButton: {
    backgroundColor: THEME.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ─── Divider ─────────────────────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: THEME.border,
    marginHorizontal: 20,
    marginBottom: 24,
  },
});
