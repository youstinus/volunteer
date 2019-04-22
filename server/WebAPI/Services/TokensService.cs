using AutoMapper;
using WebAPI.Base;
using WebAPI.Base.Interfaces;
using WebAPI.Models;
using WebAPI.Models.DTO;
using WebAPI.Services.Interfaces;

namespace WebAPI.Services
{
    public class TokensService : BaseService<Token, TokenDto>, ITokensService
    {
        public TokensService(IBaseRepository<Token> repository, IMapper mapper, ITimeService timeService) : base(repository, mapper, timeService)
        {
        }
    }
}
