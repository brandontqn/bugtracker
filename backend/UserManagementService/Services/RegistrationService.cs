using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace UserManagementService.Services
{
    public class RegistrationService
    {
        private static readonly HttpClient client = new HttpClient();

        private string tokenApi = "https://localhost:44364/api/tokens/default";

        public async Task<bool> PostAsync()
        {
            var response = await client.PostAsJsonAsync(tokenApi, "");

            return true;
        }
    }
}
