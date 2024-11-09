import React, { useState, useEffect } from 'react';

function BookForm() {
  const [bookName, setBookName] = useState("");
  const [bookId, setBookId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actionType, setActionType] = useState("");

  // פונקציה להוספת ספר
  const addBook = () => {
    const url = "https://localhost:44377/api/AddBook";

    const bookData = { Name: bookName };

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    })
    .then(response => {
      // בדיקה אם התגובה היא JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then(data => {
      console.log('Book added successfully:', data);
      setBookName(""); // איפוס השדה
      window.location.reload(); // רענון הדף לאחר הוספה מוצלחת
    })
    .catch(error => console.error('Error adding book:', error));
  };

  //פונקציה לעדכון ספר
  const updateBook = () => {
    const url = `https://localhost:44377/api/UpdateBook/${bookId}`;
  
    const bookData = {
      Id: bookId, // ID הספר
      Name: bookName // שם הספר
    };
  
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(`Error: ${text}`);
        });
      }
  
      if (response.status === 204) {
        console.log('Book updated successfully, no content returned.');
        return; 
      }
  
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Book updated successfully:', data);
      }
      setBookId(""); // איפוס מזהה ספר
      setBookName(""); // איפוס שם הספר
      window.location.reload(); // רענון הדף לאחר הוספה מוצלחת
    })
    .catch(error => console.error('Error updating book:', error));
  };

  // פונקציה למחיקת ספר
const deleteBook = () => {
  if (!bookId) {
    console.error("Book ID is empty or undefined");
    return;
  }

  const url = `https://localhost:44377/api/Book/DeleteBook/${bookId}`;
  console.log("Attempting to delete book with ID:", bookId);

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      if (response.ok) {
        if (response.status === 204) {
          console.log('Book deleted successfully');
          setBookId(""); // איפוס השדה
          window.location.reload(); // רענון הדף לאחר הוספה מוצלחת
        } else {
          return response.json();
        }
      } else {
        return response.text().then(text => { throw new Error(text); });
      }
    })
    .then(data => {
      if (data) {
        console.log('Book deleted successfully:', data);
      }
    })
    .catch(error => console.error('Error deleting book:', error.message));
};

  // useEffect לשליחת הבקשה לפי סוג הפעולה
  useEffect(() => {
    if (isSubmitted && actionType) {
      if (actionType === "add") addBook();
      if (actionType === "update") updateBook();
      if (actionType === "delete") deleteBook();
      setIsSubmitted(false);
    }
  }, [isSubmitted, actionType]);

  // פונקציה לטיפול בשליחה
  const handleSubmit = (event) => {
    event.preventDefault();
    setActionType("add");
    setIsSubmitted(true);
  };

  // פונקציה לטיפול בעדכון ספר
  const handleUpdate = (event) => {
    event.preventDefault();
    setActionType("update");
    setIsSubmitted(true);
  };

  // פונקציה לטיפול במחיקת ספר
  const handleDelete = (event) => {
    event.preventDefault();
    setActionType("delete");
    setIsSubmitted(true);
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter book ID to update"
          required
        />
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter new book name"
          required
        />
        <button type="submit">Update Book</button>
      </form>

      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          placeholder="Enter book ID to delete"
          required
        />
        <button type="submit">Delete Book</button>
      </form>
    </div>
  );
}

export default BookForm;