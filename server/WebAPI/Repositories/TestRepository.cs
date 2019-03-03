using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class TestRepository : BaseRepository<Test>, ITestRepository
    {
        protected override DbSet<Test> ItemSet { get; }
        public TestRepository(VolunteerDbContext context) : base(context)
        {
        }
    }
}
