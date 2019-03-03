using System.Collections.Generic;

namespace WebAPI.ViewModels
{
#if (Swagger)
    using ApiTemplate.ViewModelSchemaFilters;
    using Swashbuckle.AspNetCore.Annotations;

    [SwaggerSchemaFilter(typeof(PageResultCarSchemaFilter))]
#endif
    public class PageResult<T>
        where T : class
    {
        public int Page { get; set; }

        public int Count { get; set; }

        public bool HasNextPage { get => this.Page < this.TotalPages; }

        public bool HasPreviousPage { get => this.Page > 1; }

        public int TotalCount { get; set; }

        public int TotalPages { get; set; }

        public ICollection<T> Items { get; set; }
    }
}
