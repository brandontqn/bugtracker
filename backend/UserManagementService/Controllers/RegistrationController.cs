using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UserManagementService.Models;
using UserManagementService.Services;

using System.Net.Mail;
using Okta.Sdk;

namespace UserManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly RegistrationService _registrationService;

        public RegistrationController(RegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        /// <summary>
        /// Registration Inline Hook is called
        /// </summary>
        /// <param name="req">The Okta JSON payload send to this external service.</param>
        /// <returns>2xx response if successful. 4xx response if failed. Use ERROR object if failed.. don't use HTTP codes for errors.</returns>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody]Email email)
        {
            //return Ok();
            var tokenTime = await _registrationService.GetAsync(); // requesting new token from TokenGenerationService
            _registrationService.SendEmail(email.value, tokenTime.tokenString);

            return Ok(tokenTime);
        }

        [HttpPost("validate/{tokenString}")]
        public async Task<ActionResult> ValidateToken(string tokenString)
        {
            var patchResponse = await _registrationService.PatchAsync(tokenString); // calling TokenGenerationService to validate token
            return Ok(patchResponse.IsSuccessStatusCode);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateOktaUser([FromBody]Account account)
        {
            IUser user = await _registrationService.CreateOktaUserWithPassword(account);
            return Ok(user);
        }

        [HttpGet("getUser")]
        public async Task<ActionResult> GetOktaUser([FromBody]Email userId)
        {
            IUser user = await _registrationService.GetOktaUserAsync(userId.value);
            return Ok(user);
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveOktaUser([FromBody]Email userId)
        {
            IUser user = await _registrationService.GetOktaUserAsync(userId.value);
            await user.DeactivateAsync();
            await user.DeactivateOrDeleteAsync();
            return Ok();
        }
    }
}
