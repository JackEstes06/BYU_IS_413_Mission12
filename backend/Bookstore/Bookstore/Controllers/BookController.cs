using Bookstore.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        public BookController(BookDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBooks")]
        public IActionResult GetBooks(int cardsPerPage = 5, int pageNum = 1, bool sortByName = false,[FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            if (sortByName)
            {
                query = query.OrderBy(b => b.Title);
            }
            
            var numBooks = query.Count();
            var bookList = query
                .Skip((pageNum - 1) * cardsPerPage)
                .Take(cardsPerPage)
                .ToList();

            var booksData = new
            {
                Books = bookList,
                NumBooks = numBooks,
            };
            
            return Ok(booksData);
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetProjectsTypes()
        {
            var projectTypes = _context.Books
                .Select(x => x.Category)
                .Distinct()
                .ToList();
            
            return Ok(projectTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            Console.WriteLine("New Book:", newBook);
            
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book newBook)
        {
            var existingBook = _context.Books.Find(bookId);

            if (existingBook != null)
            {
                existingBook.Title = newBook.Title;
                existingBook.Author = newBook.Author;
                existingBook.Publisher = newBook.Publisher;
                existingBook.ISBN = newBook.ISBN;
                existingBook.Classification = newBook.Classification;
                existingBook.Category = newBook.Category;
                existingBook.PageCount = newBook.PageCount;
                existingBook.Price = newBook.Price;
                
                _context.Books.Update(existingBook);
            }
            
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var existingBook = _context.Books.Find(bookId);
            if (existingBook == null)
            {
                return NotFound(new {message = "Book not found"});
            }
            
            _context.Books.Remove(existingBook);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
