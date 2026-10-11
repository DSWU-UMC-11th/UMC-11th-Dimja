import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import MovieGrid from "./components/movie-grid";
import Pagination from "./components/pagination";
import { movies as initialMovies } from "./data/movies";

export default function App() {
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
    <div className="app">
      <Header />
      <MovieGrid movies={movies} onToggleBookmark={handleToggleBookmark} />
      <Pagination />
    </div>
  );
}
