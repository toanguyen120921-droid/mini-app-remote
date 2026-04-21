export const SEARCH_THEME = {
  background: '#090D14',
  surface: '#121826',
  card: '#1A2233',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
  accent: '#F7C85D',
  inputBg: '#151D2D',
} as const;

export const SEARCH_COPY = {
  title: 'Khám phá',
  subtitle: 'Tìm kiếm phim yêu thích của bạn',
  placeholder: 'Tìm phim, diễn viên, thể loại...',
  emptyTitle: 'Không tìm thấy kết quả',
  emptyMessage: 'Thử tìm với từ khóa khác nhé.',
  genresTitle: 'Thể loại phổ biến',
} as const;

export interface GenreCard {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export const GENRE_CARDS: GenreCard[] = [
  {id: 'action', name: 'Action', emoji: '💥', color: '#E63B45'},
  {id: 'comedy', name: 'Comedy', emoji: '😂', color: '#F6AD55'},
  {id: 'drama', name: 'Drama', emoji: '🎭', color: '#9F7AEA'},
  {id: 'sci-fi', name: 'Sci-Fi', emoji: '🚀', color: '#4299E1'},
  {id: 'horror', name: 'Horror', emoji: '👻', color: '#2D3748'},
  {id: 'romance', name: 'Romance', emoji: '💕', color: '#ED64A6'},
  {id: 'animation', name: 'Animation', emoji: '🎨', color: '#48BB78'},
  {id: 'thriller', name: 'Thriller', emoji: '🔪', color: '#718096'},
  {id: 'adventure', name: 'Adventure', emoji: '🗺️', color: '#DD6B20'},
  {id: 'crime', name: 'Crime', emoji: '🔍', color: '#2B6CB0'},
  {id: 'history', name: 'History', emoji: '📜', color: '#B7791F'},
  {id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦', color: '#38B2AC'},
];
