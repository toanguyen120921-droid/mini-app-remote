export type HomeSectionKey = 'popular' | 'latest';

export interface Movie {
  id: string;
  title: string;
  year: string;
  genre: string[];
  duration: string;
  rating: number;
  popularity: number;
  releaseDate: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  isFeatured?: boolean;
}

export interface HomeSection {
  key: HomeSectionKey;
  title: string;
  emptyMessage: string;
  movies: Movie[];
}

export const HOME_THEME = {
  background: '#090D14',
  surface: '#121826',
  surfaceMuted: '#1A2233',
  card: '#141C2A',
  border: 'rgba(255, 255, 255, 0.08)',
  primary: '#E63B45',
  primaryMuted: 'rgba(230, 59, 69, 0.16)',
  accent: '#F7C85D',
  text: '#F8FAFC',
  textSecondary: '#C0C8D6',
  textMuted: '#7A8498',
  gradientStart: 'rgba(8, 10, 15, 0.08)',
  gradientMiddle: 'rgba(8, 10, 15, 0.38)',
  gradientEnd: 'rgba(8, 10, 15, 0.96)',
} as const;

export const HOME_COPY = {
  eyebrow: 'Curated For Tonight',
  title: 'Movies App',
  subtitle: 'Featured premieres, hot picks, and fresh releases in one flow.',
  featuredLabel: 'Featured',
  seeAllLabel: 'See all',
  reloadLabel: 'Reload',
  reloadTitle: 'Reload remote',
  reloadDescription:
    'Hook this action to your host app update flow when the remote is embedded.',
} as const;

export const MOVIE_CATALOG: Movie[] = [
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    year: '2024',
    genre: ['Sci-Fi', 'Adventure'],
    duration: '2h 46m',
    rating: 8.7,
    popularity: 98,
    releaseDate: '2024-03-01',
    synopsis:
      'Paul Atreides steps deeper into war, prophecy, and power as Arrakis fractures around him.',
    posterUrl: 'https://picsum.photos/seed/dune-part-two-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/dune-part-two-backdrop/1280/720',
    isFeatured: true,
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    year: '2023',
    genre: ['Drama', 'History'],
    duration: '3h 00m',
    rating: 8.4,
    popularity: 92,
    releaseDate: '2023-07-21',
    synopsis:
      'A dense character study of ambition, consequence, and the cost of building the atomic age.',
    posterUrl: 'https://picsum.photos/seed/oppenheimer-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/oppenheimer-backdrop/1280/720',
    isFeatured: true,
  },
  {
    id: 'across-the-spider-verse',
    title: 'Across the Spider-Verse',
    year: '2023',
    genre: ['Animation', 'Adventure'],
    duration: '2h 20m',
    rating: 8.6,
    popularity: 95,
    releaseDate: '2023-06-02',
    synopsis:
      'Miles is pushed across a multiverse collision where style, speed, and stakes all escalate.',
    posterUrl: 'https://picsum.photos/seed/spider-verse-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/spider-verse-backdrop/1280/720',
    isFeatured: true,
  },
  {
    id: 'furiosa',
    title: 'Furiosa',
    year: '2024',
    genre: ['Action', 'Sci-Fi'],
    duration: '2h 28m',
    rating: 7.8,
    popularity: 88,
    releaseDate: '2024-05-24',
    synopsis:
      'A brutal chase through wasteland politics, survival, and revenge before the legend fully forms.',
    posterUrl: 'https://picsum.photos/seed/furiosa-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/furiosa-backdrop/1280/720',
    isFeatured: true,
  },
  {
    id: 'inside-out-2',
    title: 'Inside Out 2',
    year: '2024',
    genre: ['Animation', 'Family'],
    duration: '1h 36m',
    rating: 7.9,
    popularity: 91,
    releaseDate: '2024-06-14',
    synopsis:
      'Riley grows up, and her inner world gets noisier, funnier, and a lot more complicated.',
    posterUrl: 'https://picsum.photos/seed/inside-out-2-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/inside-out-2-backdrop/1280/720',
  },
  {
    id: 'the-batman',
    title: 'The Batman',
    year: '2022',
    genre: ['Action', 'Crime'],
    duration: '2h 56m',
    rating: 8.0,
    popularity: 90,
    releaseDate: '2022-03-04',
    synopsis:
      'A grounded Gotham noir where corruption, obsession, and fear become the real villains.',
    posterUrl: 'https://picsum.photos/seed/the-batman-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/the-batman-backdrop/1280/720',
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    year: '2023',
    genre: ['Drama', 'Romance'],
    duration: '1h 46m',
    rating: 8.1,
    popularity: 79,
    releaseDate: '2023-06-23',
    synopsis:
      'A quiet, devastating look at timing, migration, and the relationships that shape identity.',
    posterUrl: 'https://picsum.photos/seed/past-lives-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/past-lives-backdrop/1280/720',
  },
  {
    id: 'civil-war',
    title: 'Civil War',
    year: '2024',
    genre: ['Thriller', 'Action'],
    duration: '1h 49m',
    rating: 7.3,
    popularity: 82,
    releaseDate: '2024-04-12',
    synopsis:
      'Journalists cross a fractured America where the camera becomes part witness, part weapon.',
    posterUrl: 'https://picsum.photos/seed/civil-war-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/civil-war-backdrop/1280/720',
  },
  {
    id: 'mission-impossible-dead-reckoning',
    title: 'Mission: Impossible',
    year: '2023',
    genre: ['Action', 'Thriller'],
    duration: '2h 43m',
    rating: 7.7,
    popularity: 87,
    releaseDate: '2023-07-12',
    synopsis:
      'Ethan Hunt races an intelligence threat that moves faster than any field team can predict.',
    posterUrl: 'https://picsum.photos/seed/mission-impossible-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/mission-impossible-backdrop/1280/720',
  },
  {
    id: 'poor-things',
    title: 'Poor Things',
    year: '2023',
    genre: ['Drama', 'Sci-Fi'],
    duration: '2h 21m',
    rating: 8.0,
    popularity: 84,
    releaseDate: '2023-12-08',
    synopsis:
      'A surreal coming-of-self story that weaponizes curiosity, wit, and total visual confidence.',
    posterUrl: 'https://picsum.photos/seed/poor-things-poster/600/900',
    backdropUrl: 'https://picsum.photos/seed/poor-things-backdrop/1280/720',
  },
];

const matchesCategory = (movie: Movie, activeCategory: string) =>
  activeCategory === 'All' || movie.genre.includes(activeCategory);

const sortByPopularity = (left: Movie, right: Movie) =>
  right.popularity - left.popularity;

const sortByLatest = (left: Movie, right: Movie) =>
  new Date(right.releaseDate).getTime() - new Date(left.releaseDate).getTime();

export const FEATURED_MOVIES = MOVIE_CATALOG.filter(movie => movie.isFeatured);

export const buildCategories = (movies: Movie[] = MOVIE_CATALOG): string[] => {
  const genres = new Set(movies.flatMap(movie => movie.genre));
  return ['All', ...genres];
};

export const buildHomeSections = (
  movies: Movie[] = MOVIE_CATALOG,
  activeCategory = 'All',
): HomeSection[] => {
  const filteredMovies = movies.filter(movie =>
    matchesCategory(movie, activeCategory),
  );

  return [
    {
      key: 'popular',
      title: 'Most Popular',
      emptyMessage: `No ${activeCategory} titles in popular picks yet.`,
      movies: [...filteredMovies].sort(sortByPopularity).slice(0, 6),
    },
    {
      key: 'latest',
      title: 'Latest Movies',
      emptyMessage: `No ${activeCategory} titles in the latest drop yet.`,
      movies: [...filteredMovies].sort(sortByLatest).slice(0, 6),
    },
  ];
};
