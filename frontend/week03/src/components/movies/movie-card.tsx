import { Link } from "@tanstack/react-router";
import type { Movie } from "../../types/movie";
import { cn } from "../../utils/cn";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
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
        <button
          className={cn(
            "absolute right-2 top-2 flex size-7 items-center justify-center rounded-md border",
            movie.isBookmarked
              ? "border-blue-600 bg-blue-600"
              : "border-white/70 bg-black/60",
          )}
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            className="size-4"
            src={
              movie.isBookmarked
                ? "/icons/bookmark.svg"
                : "/icons/bookmark-outline.svg"
            }
            alt={movie.isBookmarked ? "북마크됨" : "북마크 안 됨"}
          />
        </button>
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
