

import React, { useState } from 'react';
import BookTable from './BookTable';
import BookForm from './BookForm';

function BookManager() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const addBook = (book) => {
    const newBook = { BookId: Date.now(), ...book };
    console.log("Adding book:", newBook); // הדפסת הספר הנוסף
    setBooks([...books, newBook]);
  };

  const updateBook = (updatedBook) => {
    console.log("Updating book:", updatedBook); // הדפסת הספר המעודכן
    setBooks(books.map((book) => (book.BookId === updatedBook.BookId ? updatedBook : book)));
    setEditingBook(null);
  };

  const deleteBook = (BookId) => {
    console.log("Deleting book with ID:", BookId); // הדפסת ה-ID של הספר שנמחק
    setBooks(books.filter((book) => book.BookId !== BookId));
  };

  return (
    <div>
      <BookTable books={books} onDelete={deleteBook} onEdit={setEditingBook} />
      <BookForm onSave={editingBook ? updateBook : addBook} editingBook={editingBook} />
    </div>
  );
}

export default BookManager;

