using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base.Interfaces;
using WebAPI.Configs;

namespace WebAPI.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly VolunteerDbContext Context;

        protected abstract DbSet<T> ItemSet { get; }

        protected BaseRepository(VolunteerDbContext context)
        {
            Context = context;
        }

        protected virtual IQueryable<T> IncludeDependencies(IQueryable<T> queryable)
        {
            return queryable;
        }

        public virtual async Task<ICollection<T>> GetAll()
        {
            var items = await IncludeDependencies(ItemSet).ToArrayAsync();
            return items;
        }

        public virtual async Task<T> GetById(int id)
        {
            var item = await IncludeDependencies(ItemSet).FirstOrDefaultAsync(x => x.Id == id);
            return item;
        }

        public virtual async Task<T> Create(T entity)
        {
            ItemSet.Add(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<bool> Update(T entity)
        {
            ItemSet.Attach(entity);
            var changes = await Context.SaveChangesAsync();
            return changes > 0;
        }

        public async Task<bool> Delete(T entity)
        {
            ItemSet.Remove(entity);
            var changes = await Context.SaveChangesAsync();
            return changes > 0;
        }
    }
}
