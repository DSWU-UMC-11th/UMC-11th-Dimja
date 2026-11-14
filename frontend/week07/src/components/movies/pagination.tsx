import { Link } from "@tanstack/react-router";
import { cn } from "../../utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="페이지 이동"
    >
      <Link
        to="/"
        search={{ page: currentPage - 1 }}
        disabled={currentPage <= 1}
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          currentPage <= 1 && "pointer-events-none opacity-30",
        )}
        aria-label="이전 페이지"
      >
        <img className="size-4" src="/icons/chevron-left.svg" alt="" />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          to="/"
          search={{ page }}
          className={cn(
            "flex size-8 items-center justify-center rounded-md text-xs", // 공통
            page === currentPage
              ? "bg-gray-900 font-bold text-white" // 현재 페이지
              : "text-gray-500", // 나머지
          )}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      <Link
        to="/"
        search={{ page: currentPage + 1 }}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex size-8 items-center justify-center rounded-md",
          currentPage >= totalPages && "pointer-events-none opacity-30",
        )}
        aria-label="다음 페이지"
      >
        <img className="size-4" src="/icons/chevron-right.svg" alt="" />
      </Link>
    </nav>
  );
}
