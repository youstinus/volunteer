using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Base.Interfaces;

namespace WebAPI.Repositories.Interfaces
{
    public interface IGenericRepository
    {
        Task<IQueryable<T>> QueryByPredicateAsync<T>(Expression<Func<T, bool>> predicate) where T : class, IBaseEntity;
        Task<IQueryable<T>> QueryAsync<T>() where T : class, IBaseEntity;
        Task<T> SingleByPredicateAsync<T>(Expression<Func<T, bool>> predicate) where T : class, IBaseEntity;
        Task<T> CreateAsync<T>(T data) where T : class, IBaseEntity;
        Task SaveChangesAsync();
    }
}
