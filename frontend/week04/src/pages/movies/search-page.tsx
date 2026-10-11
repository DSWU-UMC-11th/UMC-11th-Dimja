import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { movies } from "../../data/movies";
import { BookmarkButton } from "../../components/bookmark-button";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.originalTitle.toLowerCase().includes(normalizedQuery),
      )
    : [];

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  return (
    <main className="mx-auto max-w-[1440px] px-20 py-8">
      <h1 className="text-3xl font-bold text-gray-900">영화 검색</h1>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex items-center gap-3 rounded-lg border border-gray-300 bg-white py-2 pr-2 pl-4"
      >
        <img className="size-4" src="/icons/search.svg" alt="" />
        <input
          aria-label="검색어"
          placeholder="예: 스파이더맨"
          className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {searchText && (
          <button
            type="button"
            aria-label="검색어 지우기"
            onClick={() => setSearchText("")}
          >
            <img className="size-4" src="/icons/close.svg" alt="" />
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-4 py-2 text-xs font-semibold text-white"
        >
          {normalizedQuery ? "다시 검색" : "검색"}
        </button>
      </form>

      {!normalizedQuery ? (
        <p className="mt-16 text-center text-sm text-gray-500">
          검색어를 입력해 주세요.
        </p>
      ) : (
        <section className="mt-8">
          <div className="flex items-end justify-between border-b border-gray-200 pb-3">
            <h2 className="text-sm font-bold text-gray-900">
              ‘{query}’ 검색 결과
            </h2>
            <p className="text-xs text-gray-400">
              영화 {searchResults.length}편
            </p>
          </div>

          {searchResults.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-500">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="grid grid-cols-1 gap-x-10 lg:grid-cols-2">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex gap-5 border-b border-gray-200 py-6"
                >
                  <img
                    className="aspect-[2/3] w-32 shrink-0 rounded-lg object-cover"
                    src={movie.posterPath}
                    alt={`${movie.title} 포스터`}
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-gray-900">
                      {movie.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {movie.originalTitle} · {movie.releaseDate}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm text-gray-600">
                      {movie.overview}
                    </p>
                    <Link
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                      className="mt-3 inline-block text-xs font-semibold text-blue-600"
                    >
                      상세 보기 →
                    </Link>
                    <BookmarkButton movieId={movie.id} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
