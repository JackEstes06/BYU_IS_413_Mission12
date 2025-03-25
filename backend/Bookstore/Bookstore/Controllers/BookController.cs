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
        public IActionResult GetBooks(int cardsPerPage = 5, int pageNum = 1, bool sortByName = false)
        {
            var query = _context.Books.AsQueryable();
            
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
    }
}
