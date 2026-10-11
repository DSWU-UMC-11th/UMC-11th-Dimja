import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { BookmarkButton } from "../bookmark-button";
interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="text-left">
      <div className="relative">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img
            className="aspect-[240/272] w-full rounded-lg object-cover"
            src={movie.posterPath}
            alt={movie.title}
          />
        </Link>
        <BookmarkButton movieId={movie.id} />
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
