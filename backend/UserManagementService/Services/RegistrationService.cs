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
            //var patchResponse = await client.SendAsync(new HttpRequestMessage(HttpMethod.Patch, "http://localhost:44364/api/tokens/" + tokenString));
            var patchResponse = await client.PatchAsync("http://localhost:44364/api/tokens/" + tokenString, new StringContent(""));

            return patchResponse;
        }

        public void SendEmail(string email, string token)
        {
            MailMessage mail = new MailMessage();
            SmtpClient SmtpServer = new SmtpClient("smtp.office365.com");

            mail.From = new MailAddress("brandon.nguyen@finning.com");
            mail.To.Add(email);
            mail.Subject = "Test Mail";
            mail.Body = "Please visit this link to validate your token: https://localhost:44321/api/registration/validate/" + token;

            SmtpServer.Port = 587;
            SmtpServer.Credentials = new System.Net.NetworkCredential("", "");
            SmtpServer.EnableSsl = true;

            SmtpServer.Send(mail);
        }
    }
}
