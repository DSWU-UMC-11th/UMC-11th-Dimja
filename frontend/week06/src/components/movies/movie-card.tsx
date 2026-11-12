import { Link } from "@tanstack/react-router";
import type { MovieCardItem } from "../../utils/movies/to-movie-card-item";
import { BookmarkButton } from "../bookmark-button";
interface MovieCardProps {
  movie: MovieCardItem;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="text-left">
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.posterUrl ? (
            <img
              className="aspect-[240/272] w-full rounded-lg object-cover"
              src={movie.posterUrl}
              alt={movie.title}
            />
          ) : (
            <div className="flex aspect-[240/272] w-full items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
              이미지 없음
            </div>
          )}
        </Link>
        <BookmarkButton movieId={movie.id} className="absolute top-2 right-2" />
      </div>
      <h3 className="mt-2 text-sm font-bold text-gray-900">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          {movie.title}
        </Link>
      </h3>
      <p className="mt-0.5 text-xs text-gray-400">{movie.releaseDate}</p>
    </article>
  );
}
