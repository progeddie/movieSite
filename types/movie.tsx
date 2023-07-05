export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  production_companies: ProductionCompanies[];
  homepage: string;
  genres: Genre[];
};

export type BelongsToCollection = {
  backdrop_path: string;
  id: number;
  poster_path: string;
};

export type ProductionCompanies = {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
};

export type Genre = {
  id: number;
  name: string;
};
