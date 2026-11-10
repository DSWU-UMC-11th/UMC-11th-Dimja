import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getMovies } from "../../api/movies/get-movies";
import type { TmdbMovieListItem } from "../../api/movies/models";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { toMovieCardItem } from "../../utils/movies/to-movie-card-item";

export function MovieListPage() {
  const { page = 1 } = useSearch({ from: "/" });
  const [totalPages, setTotalPages] = useState(1);
  const [retryCount, setRetryCount] = useState(0);
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadMovies() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getMovies({ page });
        if (!ignore) {
          setMovies(response.results);
          setTotalPages(Math.min(response.total_pages, 500));
        }
      } catch {
        if (!ignore) setErrorMessage("영화 목록을 불러오지 못했어요.");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadMovies();

    return () => {
      ignore = true;
    };
  }, [page, retryCount]);

  return (
    <main className="mx-auto max-w-[1440px] px-20 py-8">
      <h1 className="text-3xl font-bold">영화 목록</h1>
      <div className="mt-6">
        {isLoading ? (
          <p className="text-gray-500">영화 목록을 불러오는 중이에요.</p>
        ) : errorMessage ? (
          <div className="flex flex-col items-center gap-3 py-16 text-sm">
            <p className="text-red-500">{errorMessage}</p>
            <button
              type="button"
              onClick={() => setRetryCount((count) => count + 1)}
              className="rounded-md bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
            >
              다시 시도
            </button>
          </div>
        ) : movies.length === 0 ? (
          <p className="text-gray-500">조건에 맞는 영화가 없어요.</p>
        ) : (
          <MovieGrid movies={movies.map(toMovieCardItem)} />
        )}
      </div>
      {!isLoading && !errorMessage && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </main>
  );
}
