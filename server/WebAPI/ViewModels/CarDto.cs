namespace WebAPI.ViewModels
{
    public class CarDto
    {
#if (Swagger)
/// <summary>
/// The cars unique identifier.
/// </summary>
#endif
        public int CarId { get; set; }

#if (Swagger)
/// <summary>
/// The number of cylinders in the cars engine.
/// </summary>
#endif
        public int Cylinders { get; set; }

#if (Swagger)
/// <summary>
/// The make of the car.
/// </summary>
#endif
        public string Make { get; set; }

#if (Swagger)
/// <summary>
/// The model of the car.
/// </summary>
#endif
        public string Model { get; set; }

#if (Swagger)
/// <summary>
/// The URL used to retrieve the resource conforming to REST'ful JSON http://restfuljson.org/.
/// </summary>
#endif
        public string Url { get; set; }
    }
}
