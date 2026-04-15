import {HomeSection, Movie} from './models/home.model';

export interface HomeScreenProps {
  onLoadComplete?: () => void;
  onRequestUpdate?: () => void;
  onMoviePress?: (movie: Movie) => void;
  onSeeAllPress?: (section: HomeSection) => void;
}
