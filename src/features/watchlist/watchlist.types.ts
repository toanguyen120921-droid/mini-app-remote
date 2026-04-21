import type {Movie} from '../home/models/home.model';

export interface WatchlistScreenProps {
  onMoviePress?: (movie: Movie) => void;
}
