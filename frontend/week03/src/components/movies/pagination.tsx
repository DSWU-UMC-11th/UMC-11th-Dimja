export default function Pagination() {
  const pages = [1, 2, 3, 4, 5];

  return (
    <nav className="pagination">
      {pages.map((page) => (
        <button key={page} className="pagination__button">
          {page}
        </button>
      ))}
    </nav>
  );
}