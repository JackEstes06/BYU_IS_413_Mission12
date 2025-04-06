import { Book } from '../types/Book';

const API_URL =
  'https://bookstore2-estes-mission13-backend-buaca7dycsfhf7e7.centralus-01.azurewebsites.net/api/Book';

interface FetchBooksResponse {
  books: Book[];
  numBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortByName: boolean,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((c) => `bookTypes=${encodeURIComponent(c)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/?cardsPerPage=${pageSize}&pageNum=${pageNum}&sortByName=${sortByName}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (e) {
    console.error('Error fetching Books: ', e);
    throw e;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    console.log(
      `newBook: ${newBook.bookId}, ${newBook.title}, ${newBook.author}, ${newBook.publisher}, ${newBook.classification}, ${newBook.category}, ${newBook.isbn}, ${newBook.pageCount}, ${newBook.price}`
    );
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (e) {
    console.error(`Error adding a book: ${e}`);
    throw e;
  }
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response) {
      throw new Error('Failed to update book');
    }

    return await response.json();
  } catch (e) {
    console.error(`Error updating book: ${e}`);
    throw e;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response) {
      throw new Error('Failed to delete book');
    }

    return;
  } catch (e) {
    console.error(`Error deleting book: ${e}`);
    throw e;
  }
};
