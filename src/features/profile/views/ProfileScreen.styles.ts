import {StyleSheet} from 'react-native';
import {PROFILE_THEME} from '../models/profile.model';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PROFILE_THEME.background,
  },
  content: {
    padding: 16,
    paddingBottom: 110, 
  },
  header: {
    marginBottom: 20,
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
  card: {
    backgroundColor: PROFILE_THEME.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    padding: 18,
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
    marginTop: 12,
  },
  metaPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: PROFILE_THEME.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  metaText: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
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
  emptyBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PROFILE_THEME.border,
    backgroundColor: PROFILE_THEME.surface,
    padding: 16,
  },
  emptyTitle: {
    color: PROFILE_THEME.text,
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: PROFILE_THEME.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
  errorBox: {
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
  rawBox: {
    marginTop: 16,
    borderRadius: 16,
    padding: 14,
    backgroundColor: '#0D1320',
  },
  rawTitle: {
    color: PROFILE_THEME.text,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  rawText: {
    color: PROFILE_THEME.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
});
