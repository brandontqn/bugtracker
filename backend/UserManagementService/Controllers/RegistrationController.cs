using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UserManagementService.Models;
using UserManagementService.Services;

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
        public async Task<ActionResult/*<OktaRequest>*/> PostAsync([FromBody]OktaRequest req)
        {
            // do our own token validation using TokenService
            // need to wait for validation before activating user
            // return DO NOT ACTIVATE for now

            var response = await _registrationService.PostAsync();
            var token = await _registrationService.GetAsync(response.Headers.Location.ToString());
            var jsonString = await token.Content.ReadAsStringAsync();
            var deserialized = JsonConvert.DeserializeObject<TokenTime>(jsonString);

            //deserialized.tokenString

            return Ok(deserialized);
        }
    }
}
