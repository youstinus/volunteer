using System;
using WebAPI.Services.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Mappers
{
    public class CarToSaveCarMapper// : IMapper<Models.Car, SaveCar>, IMapper<SaveCar, Models.Car>
    {
        private readonly ITimeService _timeService;

        public CarToSaveCarMapper(ITimeService timeService) =>
            this._timeService = timeService;

        public void Map(Models.Car source, SaveCar destination)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            if (destination == null)
            {
                throw new ArgumentNullException(nameof(destination));
            }

            destination.Cylinders = source.Cylinders;
            destination.Make = source.Make;
            destination.Model = source.Model;
        }

        public void Map(SaveCar source, Models.Car destination)
        {
            if (source == null)
            {
                throw new ArgumentNullException(nameof(source));
            }

            if (destination == null)
            {
                throw new ArgumentNullException(nameof(destination));
            }

            var now = this._timeService.UtcNow;

            if (destination.Created == DateTimeOffset.MinValue)
            {
                destination.Created = now;
            }

            destination.Cylinders = source.Cylinders;
            destination.Make = source.Make;
            destination.Model = source.Model;
            destination.Modified = now;
        }
    }
}
