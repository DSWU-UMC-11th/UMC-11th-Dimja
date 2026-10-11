import { useState } from "react";
import MovieGrid from "../../components/movies/movie-grid";
import Pagination from "../../components/movies/pagination";
import { movies as initialMovies } from "../../data/movies";

export function MovieListPage() {
  const [movies, setMovies] = useState(initialMovies);

  function handleToggleBookmark(movieId: number) {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-[1440px] px-20 py-8">
      <h1 className="text-3xl font-bold">영화 목록</h1>
      <div className="mt-6">
        <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      </div>
      <Pagination />
    </main>
  );
}