using Microsoft.EntityFrameworkCore;
using Vendinha.Api.Models;

namespace Vendinha.Api.Data
{
    public class ApiDbContext : DbContext
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Divida> Divida { get; set; }
    }
}
