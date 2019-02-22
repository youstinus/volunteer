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
    public class VolunteersRepository : BaseRepository<Volunteer>
    {
        protected override DbSet<Volunteer> ItemSet { get; }
        public VolunteersRepository(VolunteerDbContext context) : base(context)
        {
            ItemSet = context.Volunteers;
        }
    }
}
