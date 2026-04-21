import {StyleSheet, Platform} from 'react-native';
import {SEARCH_THEME} from '../models/search.model';

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SEARCH_THEME.background,
  },
  content: {
    paddingBottom: 100,
  },

  // ─── Header ──────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 8,
  },
  title: {
    color: SEARCH_THEME.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: SEARCH_THEME.textMuted,
    fontSize: 14,
    marginBottom: 16,
  },

  // ─── Search Bar ──────────────────────────────────────────────────────────────
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SEARCH_THEME.inputBg,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: SEARCH_THEME.border,
  },
  searchIcon: {
    color: SEARCH_THEME.textMuted,
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: SEARCH_THEME.text,
    fontSize: 15,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 6,
  },
  clearButtonText: {
    color: SEARCH_THEME.textMuted,
    fontSize: 18,
    fontWeight: '600',
  },

  // ─── Genre Grid ──────────────────────────────────────────────────────────────
  genresSection: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  genresSectionTitle: {
    color: SEARCH_THEME.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  genreCard: {
    width: '47%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  genreCardSelected: {
    borderWidth: 2,
    borderColor: '#FFF',
  },
  genreEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  genreName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ─── Results ─────────────────────────────────────────────────────────────────
  resultsSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  resultsCount: {
    color: SEARCH_THEME.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    backgroundColor: SEARCH_THEME.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: SEARCH_THEME.border,
  },
  resultPoster: {
    width: 100,
    height: 140,
  },
  resultInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'center',
  },
  resultTitle: {
    color: SEARCH_THEME.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  resultGenre: {
    color: SEARCH_THEME.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  resultMeta: {
    color: SEARCH_THEME.textMuted,
    fontSize: 12,
  },
  resultRating: {
    color: SEARCH_THEME.accent,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },

  // ─── Empty State ─────────────────────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: SEARCH_THEME.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    color: SEARCH_THEME.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },

  // ─── Loading ─────────────────────────────────────────────────────────────────
  loadingContainer: {
    paddingTop: 40,
    alignItems: 'center',
  },
});
