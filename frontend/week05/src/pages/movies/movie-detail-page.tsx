import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import type { TmdbMovieDetail } from "../../api/movies/models";
import { BookmarkButton } from "../../components/bookmark-button";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const parsedMovieId = Number(movieId);
  const isValidMovieId = Number.isInteger(parsedMovieId) && parsedMovieId > 0;

  const [movie, setMovie] = useState<TmdbMovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    if (!(Number.isInteger(parsedMovieId) && parsedMovieId > 0)) {
      setMovie(null);
      setIsLoading(false);
      return;
    }

    async function loadMovieDetail() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovieDetail(parsedMovieId);
        if (!ignore) setMovie(response);
      } catch (error) {
        if (!ignore) setErrorMessage(getMovieDetailErrorMessage(error));
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovieDetail();

    return () => {
      ignore = true;
    };
  }, [parsedMovieId, retryCount]);

  if (!isValidMovieId) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-24 text-center text-sm text-gray-500">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-24 text-center text-sm text-gray-500">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (errorMessage || !movie) {
    return (
      <main className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-20 py-24 text-sm text-gray-500">
        <p>{errorMessage}</p>
        {errorMessage !== "영화를 찾을 수 없어요." && (
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="rounded-md bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
          >
            다시 시도
          </button>
        )}
      </main>
    );
  }

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);

  return (
    <main>
      <section className="relative h-90 overflow-hidden text-white">
        {backdropUrl ? (
          <img
            className="absolute inset-0 size-full object-cover"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-400 text-sm text-gray-100">
            이미지 없음
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-between px-20 py-6">
          <Link to="/" className="flex w-fit items-center gap-1 text-xs">
            <img
              className="size-4 invert"
              src="/icons/chevron-left.svg"
              alt=""
            />
            영화 목록
          </Link>
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="mt-2 text-sm text-white/80">{movie.original_title}</p>
            <p className="mt-1 text-xs text-white/70">
              {movie.release_date} ·{" "}
              {movie.genres.map((genre) => genre.name).join(", ")} ·{" "}
              {movie.runtime !== null
                ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                : "상영 시간 정보가 없어요."}
            </p>
            <BookmarkButton movieId={movie.id} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] gap-8 px-20 py-8">
        {posterUrl ? (
          <img
            className="aspect-[2/3] w-52 shrink-0 self-start rounded-lg object-cover shadow-lg"
            src={posterUrl}
            alt={`${movie.title} 포스터`}
          />
        ) : (
          <div className="flex aspect-[2/3] w-52 shrink-0 items-center justify-center self-start rounded-lg bg-gray-200 text-xs text-gray-500">
            이미지 없음
          </div>
        )}
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-gray-900">{movie.tagline}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {movie.overview}
          </p>
        </div>
      </section>
    </main>
  );
}
