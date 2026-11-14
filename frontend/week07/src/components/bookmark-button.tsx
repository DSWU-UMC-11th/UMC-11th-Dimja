import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  className?: string;
}

export function BookmarkButton({ movieId, className }: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(movieId)}
      aria-label={isBookmarked ? "북마크 해제" : "북마크 추가"}
      aria-pressed={isBookmarked}
      className={cn(
        "flex size-8 items-center justify-center rounded-md border",
        isBookmarked
          ? "border-blue-600 bg-blue-600"
          : "border-gray-200 bg-white",
        className,
      )}
    >
      <img
        className={cn("size-5", isBookmarked && "invert")}
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
      />
    </button>
  );
}
