import type { TmdbMovieListItem } from "../../api/movies/models";
import { getTmdbPosterUrl } from "./tmdb-image";

export interface MovieCardItem {
  id: number;
  title: string;
  posterUrl: string | null;
  releaseDate: string;
}

export function toMovieCardItem(movie: TmdbMovieListItem): MovieCardItem {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: getTmdbPosterUrl(movie.poster_path),
    releaseDate: movie.release_date,
  };
}
