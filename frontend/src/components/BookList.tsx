import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import './Booklist.css';
import AddToCartPopup from './AddToCartPopup';
import { fetchBooks } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const loadBooks = async () => {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortByName,
          selectedCategories
        );

        setBooks(data.books);
        setNumPages(Math.ceil(data.numBooks / pageSize));

        console.log(`Books: ${data.books}`);
        console.log(`Total Books: ${data.numBooks}`);
      };

      loadBooks();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [pageSize, pageNum, sortByName, selectedCategories]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <div>
        <div className="checkbox-container">
          <input
            type="checkbox"
            className="form-check-input"
            id="sortByName"
            checked={sortByName}
            onChange={() => setSortByName(!sortByName)}
          />
          <label htmlFor="sortByName">Sort Alphabetically</label>
        </div>

        <div className="row g-3">
          {books.map((b) => (
            <div className="col-12" key={b.bookId}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{b.title}</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Author:</strong> {b.author}
                    </li>
                    <li className="list-group-item">
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li className="list-group-item">
                      <strong>ISBN:</strong> {b.isbn}
                    </li>
                    <li className="list-group-item">
                      <strong>Classification:</strong> {b.classification}
                    </li>
                    <li className="list-group-item">
                      <strong>Category:</strong> {b.category}
                    </li>
                    <li className="list-group-item">
                      <strong>Pages:</strong> {b.pageCount}
                    </li>
                    <li className="list-group-item">
                      <strong>Price:</strong> ${b.price}
                    </li>
                  </ul>

                  <br />
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      setSelectedBook(b);
                      console.log(
                        `Selected book set to ${b.bookId}: ${b.title}`
                      );
                    }}
                  >
                    Add to Cart
                  </button>
                  {selectedBook && (
                    <AddToCartPopup
                      onClose={() => setSelectedBook(null)}
                      title={selectedBook.title}
                      bookId={selectedBook.bookId}
                      price={selectedBook.price}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={pageNum}
          totalPages={numPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </>
  );
}

export default BookList;
