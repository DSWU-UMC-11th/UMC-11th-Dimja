const TMDB_LOGO_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-2 px-20 py-4 text-[10px] text-gray-400">
        <img className="h-2.5" src={TMDB_LOGO_URL} alt="TMDB" />
        <p>
          This product uses the TMDB API but is not endorsed or certified by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
