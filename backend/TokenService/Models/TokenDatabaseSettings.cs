using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TokenApi.Models
{
    public class TokenDatabaseSettings : ITokenDatabaseSettings
    {
        public string TokenCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UserName { get; set; }
        public string Host { get; set; }
        public string Password { get; set; }
    }

    public interface ITokenDatabaseSettings
    {
        string TokenCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string UserName { get; set; }
        string Host { get; set; }
        string Password { get; set; }
    }
}
