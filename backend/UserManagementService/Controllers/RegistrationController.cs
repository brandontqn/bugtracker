using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UserManagementService.Models;
using UserManagementService.Services;

using System.Net.Mail;

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
            var tokenTime = await _registrationService.GetAsync(); // gets token
            _registrationService.SendEmail(email.value, tokenTime.tokenString);

            return Ok(tokenTime);
        }

        [HttpGet("validate/{tokenString}")]
        public async Task<ActionResult> ValidateToken(string tokenString)
        {
            var patchResponse = await _registrationService.PatchAsync(tokenString);
            return Ok(patchResponse.ToString());
        }
    }
}
