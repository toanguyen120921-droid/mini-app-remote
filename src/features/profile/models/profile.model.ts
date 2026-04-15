export interface TmdbAvatarDetail {
  gravatar?: {
    hash?: string | null;
  } | null;
  tmdb?: {
    avatar_path?: string | null;
  } | null;
}

export interface TmdbAccountDetail {
  avatar: TmdbAvatarDetail;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export const PROFILE_COPY = {
  title: 'Personal Profile',
  subtitle: 'Load account detail from TMDB and render the profile response.',
  loadButtonLabel: 'Load Profile Detail',
  retryButtonLabel: 'Retry',
  missingTokenTitle: 'TMDB token is missing',
  missingTokenMessage:
    'Pass accessToken from the host app before calling account detail.',
  emptyTitle: 'No profile loaded',
  emptyMessage: 'Tap the button to fetch account detail.',
} as const;

export const PROFILE_THEME = {
  background: '#090D14',
  card: '#121826',
  surface: '#1A2233',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
  accent: '#F7C85D',
  danger: '#FF6B6B',
} as const;

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

export const buildTmdbAvatarUrl = (
  account: TmdbAccountDetail | null,
): string | undefined => {
  const avatarPath = account?.avatar?.tmdb?.avatar_path;
  return avatarPath ? `${TMDB_IMAGE_BASE_URL}${avatarPath}` : undefined;
};
