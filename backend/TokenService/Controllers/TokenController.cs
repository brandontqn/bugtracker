using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

using TokenApi.Common;
using TokenApi.Models;
using TokenApi.Services;

namespace TokenApi.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        /// <summary>
        ///     Private read-only service to perform CRUD operations on the database.
        /// </summary>
        private readonly TokenService _tokenService;

        /// <summary>
        ///     Creates a token service to go along with the token controller.
        /// </summary>
        /// <param name="tokenService">
        ///     The token service assigned to this token controller.
        /// </param>
        public TokenController(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        /// <summary>
        ///     Returns all tokens currently in the database.
        /// </summary>
        /// <returns>
        ///     A list of all tokens. (May be empty list)
        /// </returns>
        [HttpGet]
        public ActionResult<List<TokenTime>> GetAll()
        {
            List<Token> tokens;
            try
            {
                tokens = _tokenService.Get();
            }
            catch
            {
                tokens = new List<Token>();
            }

            return tokens.Select(t => t.ToTokenTime()).Cast<TokenTime>().ToList();
        }
        
        /// <summary>
        ///     Returns one token matching the tokenString specified in the "data".
        /// </summary>
        /// <param name="data">
        ///     GET request payload
        /// </param>
        /// <returns>
        ///     Returns NotFound if no matching token is found in the database. 
        ///     Returns one token object if the token exists in the database. 
        /// </returns>
        [HttpGet("{tokenString:length(20)}", Name = "GetToken")]
        public ActionResult<TokenTime> GetOne(string tokenString)
        {
            Token token = _tokenService.Get(tokenString);
            if (token == null)
            {
                return NotFound();
            }

            return token.ToTokenTime();
        }

        /// <summary>
        ///     Default token creation.
        ///     Creates a token with 7 day expiration.
        /// </summary>
        /// <returns>
        ///     Returns the token which was just created.
        /// </returns>
        [HttpPost("default")]
        public IActionResult CreateDefault()
        {
            Token token = _tokenService.Create(Utils.DEFAULT_TIME);
            TokenTime tokenTime = new TokenTime { tokenString = token.TokenString, time = token.TimeRemaining() };
            return CreatedAtRoute("GetToken", new { tokenTime.tokenString }, tokenTime);
        }

        /// <summary>
        ///     Creates a new token with a valid duration specified in "data".
        /// </summary>
        /// <param name="data">
        ///     POST request payload containing a specified number of days.
        /// </param>
        /// <returns>
        ///     Returns the token which was just created.
        /// </returns>
        [HttpPost]
        public IActionResult Create([FromBody]Time t)
        {
            Token token = _tokenService.Create(t);

            if (!token.MeetsMinimumTimeRequirement(t))
            {
                _tokenService.Remove(token.TokenString);
                return BadRequest();
            }

            TokenTime tokenTime = new TokenTime { tokenString = token.TokenString, time = token.TimeRemaining() };
            return CreatedAtRoute("GetToken", new { tokenTime.tokenString }, tokenTime);
        }

        /// <summary>
        ///     Modifies a token's expiry date. Converts "Time" to "TTL" and adds to 'ttl'
        /// </summary>
        /// <param name="data">
        ///     PUT request payload containing the tokenString of the token
        ///     to be modified and a specified number of time for extension.
        /// </param>
        /// <returns>
        ///     Returns NotFound if no matching token is found in the database. 
        ///     Returns OkResult if token was found and time was updated.
        /// </returns>
        [HttpPut]
        public IActionResult ExtendTime([FromBody]TokenTime data)
        {
            Token token = _tokenService.Get(data.tokenString);
            if (token == null)
            {
                return NotFound();
            }

            Token newToken = _tokenService.ExtendTime(data);
            return Ok(newToken.ToTokenTime());
        }

        /// <summary>
        ///     Validates a token. 
        ///     If the validation time is before the token's expiry date, then the token is validated.
        ///     Else the current time is past the token's expiry date and token is not validated.
        ///     The token is removed from the database after attempting to validate it.
        /// </summary>
        /// <param name="data">
        ///     PATCH request payload containing the tokenString of the token to be validated.
        /// </param>
        /// <returns>
        ///     Returns NotFound if no matching token is found in the database. 
        ///     Return Ok if the token IS validated.
        /// </returns>
        [HttpPatch("{tokenString}")]
        public IActionResult Validate(/*[FromBody]TokenString data*/string tokenString)
        {
            //Token token = _tokenService.Get(data.tokenString);
            Token token = _tokenService.Get(tokenString);
            if (token != null && _tokenService.Validate(token.TokenString))
            {
                return Ok();
            }

            return NotFound();
        }

        /// <summary>
        ///     Here temporarily for testing purposes.
        ///     Quickly clear the database of tokens.
        /// </summary>
        /// <returns>
        ///     Returns OkResult.
        /// </returns>
        [HttpDelete]
        public IActionResult Delete()
        {
            _tokenService.Remove();
            return new OkResult();
        }
    }
}
