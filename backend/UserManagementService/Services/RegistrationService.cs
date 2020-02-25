using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using UserManagementService.Models;
using MongoDB.Driver;

using Okta.Sdk;
using Okta.Sdk.Configuration;
using System.Diagnostics;
using Newtonsoft.Json.Linq;

namespace UserManagementService.Services
{
    public class RegistrationService
    {
        public RegistrationService(string fBL, string bTS, string bOD, string bOT, string bEU, string bEP)
        {
            // Okta
            _frontendBase = fBL;
            _backendTokenService = bTS;
            _emailUsername = bEU;
            _emailPassword = bEP;

            oktaClient = new OktaClient(new OktaClientConfiguration
            {
                OktaDomain = bOD,
                Token = bOT
            });
        }

        private string _frontendBase { get; set; }
        private string _backendTokenService { get; set; }

        private string _emailUsername { get; set; }
        private string _emailPassword { get; set; }

        private readonly HttpClient httpClient = new HttpClient();
        private OktaClient oktaClient { get; set; }

        public async Task<TokenTime> GetTokenFromTokenService(string email)
        {
            var uri = _backendTokenService + "/api/tokens/default/" + email;
            var content = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(uri, content);

            return JsonConvert.DeserializeObject<TokenTime>(await response.Content.ReadAsStringAsync());
        }

        public async Task<EmailValidated> PatchAsync(string tokenString)
        {
            var content = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, "application/json");
            var uri = _backendTokenService + "/api/tokens/validate/" + tokenString;
            var response = await httpClient.PostAsync(uri, content);

            return JsonConvert.DeserializeObject<EmailValidated>(await response.Content.ReadAsStringAsync());
        }

        public void SendEmail(string email, string token) // save email and token for user creation, when user validates, create user with same email.
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.office365.com");

            mail.From = new MailAddress(_emailUsername);
            mail.To.Add(email);
            mail.Subject = "Project-Tracker account activation";
            mail.Body = "Please visit " + _frontendBase + "/validate/" + token + " to create your account!";

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential(_emailUsername, _emailPassword);
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
        }

        public async Task<IUser> CreateOktaUserWithPassword(Account account)
        {
            var user = await oktaClient.Users.CreateUserAsync(new CreateUserWithPasswordOptions
            {
                Profile = new UserProfile
                {
                    FirstName = account.firstName,
                    LastName = account.lastName,
                    Email = account.email,
                    Login = account.login
                },
                Password = account.password,
                Activate = true
            });

            return user;
        }

        public async Task<IUser> GetOktaUserAsync(string userId)
        {
            var user = await oktaClient.Users.GetUserAsync(userId);
            return user;
        }
    }
}
