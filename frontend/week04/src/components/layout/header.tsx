import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="flex h-22 items-center justify-between border-b border-gray-200 bg-white px-20">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-gray-900">
            <img className="size-4 invert" src="/icons/movie.svg" alt="" />
          </span>
          <span className="text-lg font-bold text-gray-900">UMCine</span>
        </Link>
        <nav className="flex items-center gap-6 text-xs text-gray-600">
          <Link to="/">영화</Link>
          <Link to="/search">검색</Link>
          <span>내 정보</span>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/search" aria-label="검색">
          <img className="size-5" src="/icons/search.svg" alt="" />
        </Link>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
          로그인
        </button>
      </div>
    </header>
  );
}