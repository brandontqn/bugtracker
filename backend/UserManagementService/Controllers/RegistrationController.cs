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
        public async Task<ActionResult/*<OktaRequest>*/> PostAsync([FromBody]OktaRequest req)
        {
            // do our own token validation using TokenService
            // need to wait for validation before activating user
            // return DO NOT ACTIVATE for now

            var tokenTime = await _registrationService.GetToken();

            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

            mail.From = new MailAddress("brandontqnguyen@gmail.com");
            mail.To.Add("brandon.nguyen@finning.com"); // will be the new user email
            mail.Subject = "Test Mail";
            mail.Body = "This is for testing SMTP mail from GMAIL. Your token is " + tokenTime.tokenString;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("username", "password");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);

            return Ok(tokenTime);
        }
    }
}
