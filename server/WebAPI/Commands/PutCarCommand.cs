using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Repositories.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Commands
{
    public class PutCarCommand : IPutCarCommand
    {
        private readonly ICarRepository carRepository;
        private readonly IMapper carToCarMapper;
        private readonly IMapper saveCarToCarMapper;

        public PutCarCommand(
            ICarRepository carRepository,
            IMapper carToCarMapper,
            IMapper saveCarToCarMapper)
        {
            this.carRepository = carRepository;
            this.carToCarMapper = carToCarMapper;
            this.saveCarToCarMapper = saveCarToCarMapper;
        }

        public async Task<IActionResult> ExecuteAsync(int carId, SaveCar saveCar, CancellationToken cancellationToken)
        {
            var car = await this.carRepository.Get(carId, cancellationToken);
            if (car == null)
            {
                return new NotFoundResult();
            }

            this.saveCarToCarMapper.Map<SaveCar, Models.Car>(saveCar, car);
            car = await this.carRepository.Update(car, cancellationToken);
            var carViewModel = this.carToCarMapper.Map<Models.Car, CarViewModel>(car);

            return new OkObjectResult(carViewModel);
        }
    }
}
