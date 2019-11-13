using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using UserManagementService.Models;

namespace UserManagementService.Services
{
    public class RegistrationService
    {
        private static readonly HttpClient client = new HttpClient();

        private string tokenApi = "https://localhost:44364/api/tokens/default";

        public async Task<HttpResponseMessage> PostAsync()
        {
            var content = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, "application/json");
            var response = await client.PostAsync(tokenApi, content);
            return response;
        }

        public async Task<HttpResponseMessage> GetAsync(string uri)
        {
            var response = await client.GetAsync(uri);
            return response;
        }

        public async Task<TokenTime> GetAsync()
        {
            var postResponse = await PostAsync();
            var getResponse = await GetAsync(postResponse.Headers.Location.ToString());
            var jsonString = await getResponse.Content.ReadAsStringAsync();
            var tokenTime = JsonConvert.DeserializeObject<TokenTime>(jsonString);

            return tokenTime;
        }

        public async Task<HttpResponseMessage> PatchAsync(string tokenString)
        {
            var content = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, "application/json");
            var uri = "https://localhost:44364/api/tokens/validate/" + tokenString;
            var patchResponse = await client.PostAsync(uri, content);

            return patchResponse;
        }

        public void SendEmail(string email, string token)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.office365.com");

            mail.From = new MailAddress("brandon.nguyen@finning.com");
            mail.To.Add(email);
            mail.Subject = "Test Mail";
            mail.Body = "Here's your token: " + token +
                "\nPlease visit http://localhost:4200/validate and paste the token in the provided field to create your account!";

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("", "");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
        }

        public async Task<HttpResponseMessage> CreateOktaUserWithPassword(OktaRequest req)
        {
            var url = "https://dev-662146.okta.com/oauth2/default/api/v1/users?activate=true"; // change the url
            var content = new StringContent(JsonConvert.SerializeObject(req), Encoding.UTF8, "application/json");

            var oktaResponse = await client.PostAsync(url, content);
            return oktaResponse;
        }
    }
}
