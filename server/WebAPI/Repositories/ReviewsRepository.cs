using System.Linq;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class ReviewsRepository : BaseRepository<Review>, IReviewsRepository
    {
        protected override DbSet<Review> ItemSet { get; }

        public ReviewsRepository(VolunteerDbContext context) : base(context)
        {
        }

        protected override IQueryable<Review> IncludeDependencies(IQueryable<Review> queryable)
        {
            var dependencies = queryable
                .Include(x => x.Organization)
                .Include(x => x.Volunteer);
            return dependencies;
        }
    }
}
