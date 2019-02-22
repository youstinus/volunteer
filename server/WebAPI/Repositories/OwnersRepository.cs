using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base;
using WebAPI.Configs;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class OwnersRepository : BaseRepository<Owner>
    {
        protected override DbSet<Owner> ItemSet { get; }
        public OwnersRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Owners;
        }
    }
}
