import React, { useEffect, useState } from 'react';

function BookTable() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://localhost:44377/api/GetBooks")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => setBooks(data))
            .catch(error => console.error("Fetch error:", error));
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        Id: {book.id} , Name: {book.name} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookTable;