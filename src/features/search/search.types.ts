import type {Movie} from '../home/models/home.model';

export interface SearchScreenProps {
  onMoviePress?: (movie: Movie) => void;
}
