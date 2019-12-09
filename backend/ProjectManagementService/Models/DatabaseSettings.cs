using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementService.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ProjectsCollectionName { get; set; }
        public string BoardsCollectionName { get; set; }
        public string WorkItemsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UserName { get; set; }
        public string Host { get; set; }
        public string Password { get; set; }
    }

    public interface IDatabaseSettings
    {
        string ProjectsCollectionName { get; set; }
        string BoardsCollectionName { get; set; }
        string WorkItemsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string UserName { get; set; }
        string Host { get; set; }
        string Password { get; set; }
    }
}