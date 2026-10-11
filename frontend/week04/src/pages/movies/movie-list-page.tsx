import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  return (
    <main className="mx-auto max-w-[1440px] px-20 py-8">
      <h1 className="text-3xl font-bold">영화 목록</h1>
      <div className="mt-6">
        <MovieGrid movies={initialMovies} />
      </div>
      <Pagination />
    </main>
  );
}
