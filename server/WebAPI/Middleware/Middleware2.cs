using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Middleware
{
    public class Middleware2
    {
        private readonly RequestDelegate _next;

        public Middleware2(RequestDelegate next)
        {
            this._next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            Console.WriteLine("second start");
            await _next(context);
            Console.WriteLine("second end");
        }
    }
}
