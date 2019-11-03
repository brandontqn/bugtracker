using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class WorkItemsDatabaseSettings : IWorkItemsDatabaseSettings
    {
        public string WorkItemsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string UserName { get; set; }
        public string Host { get; set; }
        public string Password { get; set; }
    }

    public interface IWorkItemsDatabaseSettings
    {
        string WorkItemsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string UserName { get; set; }
        string Host { get; set; }
        string Password { get; set; }
    }
}