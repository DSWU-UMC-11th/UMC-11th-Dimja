import { Link, useParams } from "@tanstack/react-router";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="mx-auto max-w-[1440px] px-20 py-24 text-center text-sm text-gray-500">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <main>
      <section className="relative h-90 overflow-hidden text-white">
        <img
          className="absolute inset-0 size-full object-cover"
          src={movie.backdropPath}
          alt=""
          aria-hidden="true"
        />
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
            <p className="mt-2 text-sm text-white/80">{movie.originalTitle}</p>
            <p className="mt-1 text-xs text-white/70">
              {movie.releaseDate} · {movie.genres.join(" · ")} · {movie.runtime}
            </p>
            <BookmarkButton movieId={movie.id} />
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1440px] gap-8 px-20 py-8">
        <img
          className="aspect-[2/3] w-52 shrink-0 self-start rounded-lg object-cover shadow-lg"
          src={movie.posterPath}
          alt={`${movie.title} 포스터`}
        />
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
