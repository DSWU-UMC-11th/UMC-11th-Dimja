import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
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

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", parsedMovieId],
    queryFn: () => getMovieDetail(parsedMovieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000, // 미니 실습: 상세는 30초
    // 404는 재시도해도 같은 결과라서 바로 오류를 보여줘요.
    retry: (failureCount, error) =>
      !(isHTTPError(error) && error.response.status === 404) &&
      failureCount < 3,
  });
  const movie = movieDetailQuery.data;

  if (!isValidMovieId) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-24 text-center text-sm text-gray-500">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-24 text-center text-sm text-gray-500">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (movieDetailQuery.isError || !movie) {
    const errorMessage = movieDetailQuery.isError
      ? getMovieDetailErrorMessage(movieDetailQuery.error)
      : null;
    return (
      <main className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 px-20 py-24 text-sm text-gray-500">
        <p>{errorMessage}</p>
        {errorMessage !== "영화를 찾을 수 없어요." && (
          <button
            type="button"
            onClick={() => movieDetailQuery.refetch()}
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
