using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using WebAPI.ViewModels;

namespace WebAPI.ViewModelSchemaFilters
{
    public class CarSchemaFilter : ISchemaFilter
    {
        public void Apply(Schema model, SchemaFilterContext context)
        {
            var car = new CarViewModel()
            {
                CarId = 1,
                Cylinders = 6,
                Make = "Honda",
                Model = "Civic",
                Url = "/cars/1",
            };
            model.Default = car;
            model.Example = car;
        }
    }
}
