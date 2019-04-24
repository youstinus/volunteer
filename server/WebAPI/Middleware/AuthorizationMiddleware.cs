using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Middleware
{
    public class AuthorizationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Do some work before invoking controller's actions
            //var accessToken = context.Request.Headers["Authorization"];
            
            await _next(context);

            // Do some work after invoking controller's actions
        }
    }
}
