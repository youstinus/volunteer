using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;
using WebAPI.Configurations;
using WebAPI.Repositories.Interfaces;

namespace WebAPI.Repositories
{
    public class GenericRepository : IGenericRepository
    {
        private readonly VolunteerDbContext _context;

        public GenericRepository(VolunteerDbContext context)
        {
            _context = context;
        }

        public async Task<IQueryable<T>> QueryAsync<T>() where T : class, IBaseEntity
        {
            return await Task.Run(() => _context.Set<T>());
        }

        public async Task<IQueryable<T>> QueryByPredicateAsync<T>(Expression<Func<T, bool>> predicate) where T : class, IBaseEntity
        {
            return await Task.Run(() => _context.Set<T>().Where(predicate));
        }

        public async Task<T> SingleByPredicateAsync<T>(Expression<Func<T, bool>> predicate) where T : class, IBaseEntity
        {
            return await Task.Run(() => _context.Set<T>().SingleOrDefault(predicate));
        }

        public async Task<T> CreateAsync<T>(T data) where T : class, IBaseEntity
        {
            _context.Set<T>().Add(data);
            await _context.SaveChangesAsync();
            return data;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
