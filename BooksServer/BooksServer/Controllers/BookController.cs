using BooksServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BooksServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly projectContext _context;

        public BookController(projectContext context)
        {
            _context = context;
        }

        // קריאה של כל הספרים
        [HttpGet("/api/GetBooks")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // הוספת ספר 
        [HttpPost("/api/AddBook")]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            if (book == null)
            {
                return BadRequest("Book cannot be null");
            }

            // הוספת הספר למסד הנתונים
            _context.Books.Add(book);

            // שמירת השינויים למסד הנתונים
            await _context.SaveChangesAsync();

            // החזרת הספר שנוסף עם מזהה חדש
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        //עדכון ספר
        [HttpPut("/api/UpdateBook/{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest("The book ID in the URL does not match the ID in the body.");
            }

            // חיפוש הספר במסד הנתונים
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                return NotFound();
            }

            // עדכון הספר עם הערכים החדשים
            existingBook.Name = book.Name;

            // שמירת השינויים במסד הנתונים
            await _context.SaveChangesAsync();

            return NoContent(); 
        }

        [HttpDelete("DeleteBook/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound(); 
            }

            // מחיקת הספר
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}