import {StyleSheet} from 'react-native';
import {HOME_THEME} from '../models/home.model';

export const MOVIE_CARD_WIDTH = 146;
export const MOVIE_POSTER_HEIGHT = 208;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOME_THEME.background,
  },
  listContent: {
    paddingBottom: 110, // extra space for the bottom tab bar
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: HOME_THEME.accent,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  screenTitle: {
    color: HOME_THEME.text,
    fontSize: 28,
    fontWeight: '800',
  },
  screenSubtitle: {
    color: HOME_THEME.textSecondary,
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
    maxWidth: 260,
  },
  reloadButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: HOME_THEME.surface,
    borderWidth: 1,
    borderColor: HOME_THEME.border,
  },
  reloadButtonText: {
    color: HOME_THEME.text,
    fontSize: 12,
    fontWeight: '700',
  },
  carouselSection: {
    marginTop: 10,
  },
  categoriesSection: {
    marginTop: 22,
    marginBottom: 6,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingRight: 6,
  },
  categoryPill: {
    marginRight: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: HOME_THEME.surface,
    borderWidth: 1,
    borderColor: HOME_THEME.border,
  },
  categoryPillActive: {
    backgroundColor: HOME_THEME.primary,
    borderColor: HOME_THEME.primary,
  },
  categoryText: {
    color: HOME_THEME.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: HOME_THEME.text,
  },
  section: {
    marginTop: 26,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: HOME_THEME.text,
    fontSize: 20,
    fontWeight: '800',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: HOME_THEME.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
  chevronIconText: {
    color: HOME_THEME.textSecondary,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 16,
  },
  moviesListContent: {
    paddingHorizontal: 16,
    paddingRight: 4,
  },
  movieCard: {
    width: MOVIE_CARD_WIDTH,
    marginRight: 12,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: HOME_THEME.card,
    borderWidth: 1,
    borderColor: HOME_THEME.border,
  },
  moviePoster: {
    width: '100%',
    height: MOVIE_POSTER_HEIGHT,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: MOVIE_POSTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(230, 59, 69, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    marginLeft: 3,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 11,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: HOME_THEME.text,
  },
  movieInfo: {
    padding: 12,
  },
  movieTitle: {
    color: HOME_THEME.text,
    fontSize: 14,
    fontWeight: '700',
  },
  movieGenre: {
    color: HOME_THEME.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  movieMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieMetaText: {
    color: HOME_THEME.textMuted,
    fontSize: 11,
  },
  movieRatingText: {
    color: HOME_THEME.accent,
    fontSize: 11,
    fontWeight: '700',
  },
  emptyState: {
    marginHorizontal: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: HOME_THEME.surface,
    borderWidth: 1,
    borderColor: HOME_THEME.border,
  },
  emptyStateTitle: {
    color: HOME_THEME.text,
    fontSize: 15,
    fontWeight: '700',
  },
  emptyStateText: {
    color: HOME_THEME.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 6,
  },
});
