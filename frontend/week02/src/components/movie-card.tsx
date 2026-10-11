import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onToggleBookmark: (movieId: number) => void;
}

export default function MovieCard({ movie, onToggleBookmark }: MovieCardProps) {
  return (
    <article className="movie-card">
      <img
        className="movie-card__poster"
        src={movie.posterPath}
        alt={movie.title}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__genres">{movie.genres.join(", ")}</p>
        <p className="movie-card__release-date">{movie.releaseDate}</p>
        <button
          className="movie-card__bookmark"
          aria-pressed={movie.isBookmarked}
          onClick={() => onToggleBookmark(movie.id)}
        >
          <img
            src={
              movie.isBookmarked
                ? "/movie-icons/bookmark.svg"
                : "/movie-icons/bookmark-outline.svg"
            }
            alt={movie.isBookmarked ? "북마크됨" : "북마크 안 됨"}
          />
        </button>
      </div>
    </article>
  );
}