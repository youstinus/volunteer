using System;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
using WebAPI.ViewModels;

namespace WebAPI.Mappers
{
    public class CarToCarMapper// : IMapper<Models.Car, CarViewModel>
    {
        private readonly IUrlHelper urlHelper;

        public CarToCarMapper(IUrlHelper urlHelper) => this.urlHelper = urlHelper;

        public void Map(Models.Car source, CarViewModel destination)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            if (destination == null)
            {
                throw new ArgumentNullException(nameof(destination));
            }

            destination.CarId = source.CarId;
            destination.Cylinders = source.Cylinders;
            destination.Make = source.Make;
            destination.Model = source.Model;
            destination.Url = this.urlHelper.RouteUrl(CarsControllerRoute.GetCar, new { source.CarId }); // absolute ?
        }
    }
}
