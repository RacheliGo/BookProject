

import React from 'react';

function BookRow({ book, onDelete, onEdit }) {
  return (
    <tr>
      <td>{book.BookName}</td> 
      <td>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.BookId)}>Delete</button> 
      </td>
    </tr>
  );
}

export default BookRow;

