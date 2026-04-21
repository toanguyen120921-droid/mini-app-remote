import { Movie } from '../features/home/models/home.model';
import { HomeSection } from '../features/home/models/home.model';

// ─── Root Stack ────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  MovieDetail: { movie: Movie };
  VideoPlayer: { streamUrl?: string };
};

// ─── App-level props (shared từ host hoặc standalone) ──────────────────────────
export interface AppProps {
  onLoadComplete?: () => void;
  onRequestUpdate?: () => void;
  onMoviePress?: (movie: Movie) => void;
  onSeeAllPress?: (section: HomeSection) => void;
  accountId?: string | number;
  accessToken?: string;
  onAuthMissingPress?: () => void;
  /** Cờ phân biệt chạy độc lập hay chạy trong host */
  isStandalone?: boolean;
  onBack?: () => void;
}
