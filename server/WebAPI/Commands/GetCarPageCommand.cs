using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Repositories.Interfaces;
using WebAPI.ViewModels;
using Car = WebAPI.Models.Car;

namespace WebAPI.Commands
{
    public class GetCarPageCommand : IGetCarPageCommand
    {
        private readonly ICarRepository carRepository;
        private readonly IMapper carMapper;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly IUrlHelper urlHelper;

        public GetCarPageCommand(
            ICarRepository carRepository,
            IMapper carMapper,
            IHttpContextAccessor httpContextAccessor,
            IUrlHelper urlHelper)
        {
            this.carRepository = carRepository;
            this.carMapper = carMapper;
            this.httpContextAccessor = httpContextAccessor;
            this.urlHelper = urlHelper;
        }

        public async Task<IActionResult> ExecuteAsync(PageOptions pageOptions, CancellationToken cancellationToken)
        {
            var cars = await this.carRepository.GetPage(pageOptions.Page.Value, pageOptions.Count.Value, cancellationToken);
            if (cars == null)
            {
                return new NotFoundResult();
            }

            var (totalCount, totalPages) = await this.carRepository.GetTotalPages(pageOptions.Count.Value, cancellationToken);
            var carViewModels = this.carMapper.Map<ICollection<Car>, ICollection<CarViewModel>>(cars);
            var page = new PageResult<CarViewModel>()
            {
                Count = pageOptions.Count.Value,
                Items = carViewModels,
                Page = pageOptions.Page.Value,
                TotalCount = totalCount,
                TotalPages = totalPages,
            };

            // Add the Link HTTP Header to add URL's to next, previous, first and last pages.
            // See https://tools.ietf.org/html/rfc5988#page-6
            // There is a standard list of link relation types e.g. next, previous, first and last.
            // See https://www.iana.org/assignments/link-relations/link-relations.xhtml
            this.httpContextAccessor.HttpContext.Response.Headers.Add(
                "Link",
                this.GetLinkValue(page));

            return new OkObjectResult(page);
        }

        private string GetLinkValue(PageResult<ViewModels.CarViewModel> page)
        {
            var values = new List<string>(4);

            if (page.HasNextPage)
            {
                values.Add(this.GetLinkValueItem("next", page.Page + 1, page.Count));
            }

            if (page.HasPreviousPage)
            {
                values.Add(this.GetLinkValueItem("previous", page.Page - 1, page.Count));
            }

            values.Add(this.GetLinkValueItem("first", 1, page.Count));
            values.Add(this.GetLinkValueItem("last", page.TotalPages, page.Count));

            return string.Join(", ", values);
        }

        private string GetLinkValueItem(string rel, int page, int count)
        {
            /*var url = this.urlHelper.AbsoluteRouteUrl(
                CarsControllerRoute.GetCarPage,
                new PageOptions { Page = page, Count = count });*/
            return $"<{page}>; rel=\"{rel}\"";
        }
    }
}
