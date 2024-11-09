
const express = require('express');
const { sql, poolPromise } = require('./dbo'); 
const app = express();
const PORT = 3000;



app.use(express.json());

// API endpoint להחזרת רשימת הספרים
app.get('/api/books', async (req, res) => {
    try {
        const pool = await poolPromise; 
        const result = await pool.request().query('SELECT BookId, BookName FROM Books');
        res.json(result.recordset); // החזרת הרשומות שנשלפו
    } catch (err) {
        return res.status(500).json({ error: 'Database query failed' });
    }
});

// API endpoint להוספת ספר
app.post('/api/books', async (req, res) => {
    const { BookName } = req.body;
    try {
        const pool = await poolPromise; 
        const result = await pool.request()
            .input('BookName', sql.NVarChar, BookName) 
            .query('INSERT INTO Books (BookName) OUTPUT INSERTED.BookId VALUES (@BookName)');
        
        res.status(201).json({ BookId: result.recordset[0].BookId, BookName });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to add book' });
    }
});

// API endpoint לעדכון ספר
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { BookName } = req.body;
    try {
        const pool = await poolPromise; 
        await pool.request()
            .input('BookName', sql.NVarChar, BookName)
            .input('BookId', sql.Int, id)
            .query('UPDATE Books SET BookName = @BookName WHERE BookId = @BookId');
        
        res.json({ BookId: id, BookName });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to update book' });
    }
});

// API endpoint למחיקת ספר
app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise; 
        await pool.request()
            .input('BookId', sql.Int, id)
            .query('DELETE FROM Books WHERE BookId = @BookId');
        
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete book' });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
