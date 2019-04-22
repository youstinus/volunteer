using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configurations;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class TokensRepository : BaseRepository<Token>, ITokensRepository
    {
        protected override DbSet<Token> ItemSet { get; }

        public TokensRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Tokens;
        }
    }
}
