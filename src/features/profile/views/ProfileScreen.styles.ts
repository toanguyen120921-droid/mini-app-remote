import {StyleSheet, Platform} from 'react-native';
import {PROFILE_THEME} from '../models/profile.model';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PROFILE_THEME.background,
  },
  content: {
    paddingBottom: 110,
  },

  // ─── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 8,
  },
  eyebrow: {
    color: PROFILE_THEME.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: PROFILE_THEME.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },

  // ─── Profile Card ────────────────────────────────────────────────────────────
  card: {
    backgroundColor: PROFILE_THEME.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: PROFILE_THEME.surface,
  },
  avatarFallback: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: PROFILE_THEME.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: PROFILE_THEME.border,
  },
  avatarFallbackText: {
    color: PROFILE_THEME.text,
    fontSize: 28,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    color: PROFILE_THEME.text,
    fontSize: 20,
    fontWeight: '800',
  },
  username: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    gap: 8,
  },
  metaPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: PROFILE_THEME.surface,
  },
  metaText: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },

  // ─── Stats Row ───────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: PROFILE_THEME.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    padding: 18,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    color: PROFILE_THEME.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    color: PROFILE_THEME.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // ─── Menu Section ────────────────────────────────────────────────────────────
  menuSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  menuSectionTitle: {
    color: PROFILE_THEME.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: PROFILE_THEME.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: PROFILE_THEME.border,
  },
  menuItemEmoji: {
    fontSize: 18,
    marginRight: 14,
    width: 24,
    textAlign: 'center',
  },
  menuItemText: {
    flex: 1,
    color: PROFILE_THEME.text,
    fontSize: 15,
    fontWeight: '600',
  },
  menuItemChevron: {
    color: PROFILE_THEME.textMuted,
    fontSize: 16,
    fontWeight: '700',
  },
  menuItemValueText: {
    color: PROFILE_THEME.textMuted,
    fontSize: 13,
    marginRight: 8,
  },

  // ─── Action Button ───────────────────────────────────────────────────────────
  button: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: PROFILE_THEME.primary,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.62,
  },
  buttonText: {
    color: PROFILE_THEME.text,
    fontSize: 15,
    fontWeight: '800',
  },

  // ─── Empty / Error ───────────────────────────────────────────────────────────
  emptyBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    backgroundColor: PROFILE_THEME.surface,
    padding: 20,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    color: PROFILE_THEME.text,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  emptyText: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  errorBox: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 16,
    padding: 14,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.28)',
  },
  errorText: {
    color: PROFILE_THEME.danger,
    fontSize: 13,
    lineHeight: 19,
  },

  // ─── App Info ────────────────────────────────────────────────────────────────
  appInfo: {
    alignItems: 'center',
    marginTop: 28,
    paddingBottom: 20,
  },
  appInfoText: {
    color: PROFILE_THEME.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  appInfoVersion: {
    color: PROFILE_THEME.textMuted,
    fontSize: 11,
    marginTop: 4,
  },
});
