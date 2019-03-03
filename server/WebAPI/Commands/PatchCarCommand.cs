using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using WebAPI.Models;
using WebAPI.Repositories.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Commands
{
    public class PatchCarCommand : IPatchCarCommand
    {
        private readonly IActionContextAccessor actionContextAccessor;
        private readonly IObjectModelValidator objectModelValidator;
        private readonly ICarRepository carRepository;
        private readonly IMapper carToCarMapper;
        private readonly IMapper carToSaveCarMapper;
        private readonly IMapper saveCarToCarMapper; // <SaveCar, Models.Car>

        public PatchCarCommand(
            IActionContextAccessor actionContextAccessor,
            IObjectModelValidator objectModelValidator,
            ICarRepository carRepository,
            IMapper carToCarMapper,
            IMapper carToSaveCarMapper,
            IMapper saveCarToCarMapper)
        {
            this.actionContextAccessor = actionContextAccessor;
            this.objectModelValidator = objectModelValidator;
            this.carRepository = carRepository;
            this.carToCarMapper = carToCarMapper;
            this.carToSaveCarMapper = carToSaveCarMapper;
            this.saveCarToCarMapper = saveCarToCarMapper;
        }

        public async Task<IActionResult> ExecuteAsync(
            int carId,
            JsonPatchDocument<SaveCar> patch,
            CancellationToken cancellationToken)
        {
            var car = await this.carRepository.Get(carId, cancellationToken);
            if (car == null)
            {
                return new NotFoundResult();
            }

            var saveCar = this.carToSaveCarMapper.Map<Car, SaveCar>(car);
            var modelState = this.actionContextAccessor.ActionContext.ModelState;
            patch.ApplyTo(saveCar, modelState);
            this.objectModelValidator.Validate(
                this.actionContextAccessor.ActionContext,
                validationState: null,
                prefix: null,
                model: saveCar);
            if (!modelState.IsValid)
            {
                return new BadRequestObjectResult(modelState);
            }

            this.saveCarToCarMapper.Map(saveCar, car);
            await this.carRepository.Update(car, cancellationToken);
            var carViewModel = this.carToCarMapper.Map<Car, CarViewModel>(car);

            return new OkObjectResult(carViewModel);
        }
    }
}