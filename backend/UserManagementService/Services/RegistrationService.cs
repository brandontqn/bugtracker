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
        public RegistrationService(string fBLH, string bTSI, string bOD, string bOT, string bEU, string bEP)
        {
            // Okta
            _frontendBaseLocalHost = fBLH;
            _backendTokenServiceIis = bTSI;
            _emailUsername = bEU;
            _emailPassword = bEP;

            oktaClient = new OktaClient(new OktaClientConfiguration
            {
                OktaDomain = bOD,
                Token = bOT
            });
        }

        private string _frontendBaseLocalHost { get; set; }
        private string _backendTokenServiceIis { get; set; }

        private string _emailUsername { get; set; }
        private string _emailPassword { get; set; }

        private readonly HttpClient httpClient = new HttpClient();
        private OktaClient oktaClient { get; set; }

        public async Task<HttpResponseMessage> PostAsync(string email)
        {
            var content = new StringContent(JsonConvert.SerializeObject(/*email*/""), Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync(_backendTokenServiceIis + "/default/" + email, content);
            return response;
        }

        public async Task<HttpResponseMessage> GetAsync(string uri)
        {
            var response = await httpClient.GetAsync(uri);
            return response;
        }

        public async Task<TokenTime> GetToken(string email)
        {
            var postResponse = await PostAsync(email);
            var getResponse = await GetAsync(postResponse.Headers.Location.ToString());
            var jsonString = await getResponse.Content.ReadAsStringAsync();
            var tokenTime = JsonConvert.DeserializeObject<TokenTime>(jsonString);

            return tokenTime;
        }

        //public async Task<HttpResponseMessage> PatchAsync(string tokenString)
        public async Task<EmailValidated> PatchAsync(string tokenString)
        {
            var content = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, "application/json");
            var uri = _backendTokenServiceIis + "/validate/" + tokenString;
            var patchResponse = await httpClient.PostAsync(uri, content);

            //string jsonContent = patchResponse.Content.ReadAsStringAsync().Result;

            var json = await patchResponse.Content.ReadAsAsync<EmailValidated>();
            return json;
            //return new HttpResponseMessage();
            //return new StringContent(JsonConvert.SerializeObject(jsonContent), Encoding.UTF8, "application/json");
        }

        public void SendEmail(string email, string token) // save email and token for user creation, when user validates, create user with same email.
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.office365.com");

            mail.From = new MailAddress(_emailUsername);
            mail.To.Add(email);
            mail.Subject = "Project-Tracker account activation";
            mail.Body = "Please visit " + _frontendBaseLocalHost + "/validate/" + token + " to create your account!";

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
