import { cn } from "../../utils/cn";

const currentPage = 1;

export default function Pagination() {
  const pages = [1, 2, 3, 4, 5];

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="페이지 이동"
    >
      <button
        className="flex size-8 items-center justify-center rounded-md opacity-30"
        disabled
        aria-label="이전 페이지"
      >
        <img className="size-4" src="/icons/chevron-left.svg" alt="" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={cn(
            "size-8 rounded-md text-xs", // 공통
            page === currentPage
              ? "bg-gray-900 font-bold text-white" // 현재 페이지
              : "text-gray-500", // 나머지
          )}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        className="flex size-8 items-center justify-center rounded-md"
        aria-label="다음 페이지"
      >
        <img className="size-4" src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  );
}
