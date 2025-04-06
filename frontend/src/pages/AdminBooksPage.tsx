import { useEffect, useState } from 'react';
import { deleteBook, fetchBooks } from '../api/ProjectsAPI';
import NewBookForm from '../components/NewBookForm';
import { Book } from '../types/Book';
import Pagination from '../components/Pagination';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  useEffect(() => {
    try {
      const loadBooks = async () => {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, false, []);

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
  }, [pageSize, pageNum]);

  const handleDelete = async (bookId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return;

    try {
      await deleteBook(bookId);
      setBooks(books.filter((b) => b.bookId !== bookId));
    } catch (e) {
      console.error(`Error handling delete for project: ${e}`);
      throw e;
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <h1>Admin - Books</h1>

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(pageSize, pageNum, false, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editBook && (
        <EditBookForm
          book={editBook}
          onSuccess={() => {
            setEditBook(null);
            fetchBooks(pageSize, pageNum, false, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditBook(null)}
        />
      )}

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr className="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Page Count</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.bookId}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price}</td>
              <td className="text-center">
                <button
                  className="btn btn-primary btn-sm me-2 w-100"
                  onClick={() => setEditBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(b.bookId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
    </>
  );
};

export default AdminBooksPage;
