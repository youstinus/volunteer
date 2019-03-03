using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Constants;
using WebAPI.Repositories.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Commands
{
    public class PostCarCommand : IPostCarCommand
    {
        private readonly ICarRepository carRepository;
        private readonly IMapper carToCarMapper;
        private readonly IMapper saveCarToCarMapper;

        public PostCarCommand(
            ICarRepository carRepository,
            IMapper carToCarMapper,
            IMapper saveCarToCarMapper)
        {
            this.carRepository = carRepository;
            this.carToCarMapper = carToCarMapper;
            this.saveCarToCarMapper = saveCarToCarMapper;
        }

        public async Task<IActionResult> ExecuteAsync(SaveCar saveCar, CancellationToken cancellationToken)
        {
            var car = this.saveCarToCarMapper.Map<SaveCar, Models.Car>(saveCar);
            car = await this.carRepository.Add(car, cancellationToken);
            var carViewModel = this.carToCarMapper.Map<Models.Car, CarViewModel>(car);

            return new CreatedAtRouteResult(
                CarsControllerRoute.GetCar,
                new { carId = carViewModel.CarId },
                carViewModel);
        }
    }
}
