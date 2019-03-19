using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Base.Interfaces;
using WebAPI.Configurations;

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
            return await IncludeDependencies(ItemSet).ToArrayAsync();
        }

        public virtual async Task<T> GetById(long id)
        {
            return await IncludeDependencies(ItemSet).FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T> Create(T entity)
        {
            ItemSet.Add(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public virtual async Task Update(T entity)
        {
            ItemSet.Attach(entity);
            await Context.SaveChangesAsync();
        }

        public virtual async Task Delete(T entity)
        {
            ItemSet.Remove(entity);
            await Context.SaveChangesAsync();
        }

        public virtual async Task<T> GetSingleByPredicate(Expression<Func<T, bool>> predicate)
        {
            return await IncludeDependencies(ItemSet).SingleOrDefaultAsync(predicate);
        }

        public virtual async Task<ICollection<T>> GetAllByPredicate(Expression<Func<T, bool>> predicate)
        {
            return await IncludeDependencies(ItemSet).Where(predicate).ToListAsync();
        }
    }
}
