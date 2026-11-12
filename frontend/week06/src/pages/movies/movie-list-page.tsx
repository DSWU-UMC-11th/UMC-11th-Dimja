import { useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies/get-movies";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { toMovieCardItem } from "../../utils/movies/to-movie-card-item";

export function MovieListPage() {
  const { page = 1 } = useSearch({ from: "/" });

  const moviesQuery = useQuery({
    queryKey: ["movies", "list", { page }],
    queryFn: () => getMovies({ page }),
  });

  const movies = moviesQuery.data?.results ?? [];
  const totalPages = Math.min(moviesQuery.data?.total_pages ?? 1, 500);

  return (
    <main className="mx-auto max-w-[1440px] px-20 py-8">
      <h1 className="text-3xl font-bold">영화 목록</h1>
      <div className="mt-6">
        {moviesQuery.isPending ? (
          <p className="text-gray-500">영화 목록을 불러오는 중이에요.</p>
        ) : moviesQuery.isError ? (
          <div className="flex flex-col items-center gap-3 py-16 text-sm">
            <p className="text-red-500">영화 목록을 불러오지 못했어요.</p>
            <button
              type="button"
              onClick={() => moviesQuery.refetch()}
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
      {moviesQuery.isSuccess && (
        <Pagination currentPage={page} totalPages={totalPages} />
      )}
    </main>
  );
}
