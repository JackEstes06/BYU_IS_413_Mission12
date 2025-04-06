import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/ProjectsAPI';

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add New Project</h2>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Publisher:
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Classification:
          <input
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Page Count:
          <input
            type="number"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
          ></input>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          ></input>
        </label>
        <button type="submit">Add Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewBookForm;
