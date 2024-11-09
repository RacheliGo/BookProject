using System;
using System.Collections.Generic;

namespace BooksServer.Models
{
    public partial class Book
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
    }
}
