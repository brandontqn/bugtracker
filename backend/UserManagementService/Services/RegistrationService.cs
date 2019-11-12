using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
            //var response = await client.GetStringAsync(uri);
            //var response = await client.GetStreamAsync(uri);

            return response;
        }

        public async Task<TokenTime> GetToken()
        {
            var postResponse = await PostAsync();
            var getResponse = await GetAsync(postResponse.Headers.Location.ToString());
            var jsonString = await getResponse.Content.ReadAsStringAsync();
            var tokenTime = JsonConvert.DeserializeObject<TokenTime>(jsonString);

            return tokenTime;
        }
    }
}
