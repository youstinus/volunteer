using System.Collections.Generic;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebAPI.ViewModels;

namespace WebAPI.ViewModelSchemaFilters
{
    public class PageResultCarSchemaFilter : ISchemaFilter
    {
        public void Apply(Schema model, SchemaFilterContext context)
        {
            var pageResult = new PageResult<CarViewModel>()
            {
                Count = 2,
                Items = new List<CarViewModel>()
                {
                    new CarViewModel()
                    {
                        CarId = 1,
                        Cylinders = 6,
                        Make = "Honda",
                        Model = "Civic",
                    },
                    new CarViewModel()
                    {
                        CarId = 2,
                        Cylinders = 8,
                        Make = "Lambourghini",
                        Model = "Countach",
                    },
                },
                Page = 1,
                TotalCount = 50,
                TotalPages = 10,
            };
            model.Default = pageResult;
            model.Example = pageResult;
        }
    }
}
