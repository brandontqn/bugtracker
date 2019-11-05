using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

using backend.Models;


namespace backend.Services
{
    public class WorkItemService
    {
        private readonly IMongoCollection<WorkItem> _workItems;

        public WorkItemService(IDatabaseSettings settings)
        {
            var mongoSettings = new MongoClientSettings
            {
                Server = new MongoServerAddress(settings.Host, 10255),
                UseTls = true,
                SslSettings = new SslSettings
                {
                    EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12
                }
            };

            MongoIdentity identity = new MongoInternalIdentity(settings.DatabaseName, settings.UserName);
            MongoIdentityEvidence evidence = new PasswordEvidence(settings.Password);

            mongoSettings.Credential = new MongoCredential("SCRAM-SHA-1", identity, evidence);

            var client = new MongoClient(mongoSettings);
            var database = client.GetDatabase(settings.DatabaseName);

            _workItems = database.GetCollection<WorkItem>(settings.WorkItemsCollectionName);
        }

        public List<WorkItem> GetAll()
        {
            return _workItems.Find(item => true).ToList();
        }

        public WorkItem Get(string id)
        {
            return _workItems.Find(item => item.id == id).FirstOrDefault();
        }

        public WorkItem Create(string name, string details)
        {
            WorkItem item = new WorkItem(name, details);

            try
            {
                _workItems.InsertOne(item);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e);
            }

            return item;
        }

        public WorkItem UpdateName(string id, string name)
        {
            WorkItem item = _workItems.Find(x => x.id == id).FirstOrDefault();

            item.name = name;
            _workItems.ReplaceOne(x => x.id == item.id, item);

            return item;
        }

        public WorkItem UpdateDetail(string id, string details)
        {
            WorkItem item = _workItems.Find(x => x.id == id).FirstOrDefault();
            
            item.detail = details;
            _workItems.ReplaceOne(x => x.id == item.id, item);

            return item;
        }

        public void Remove(string id) =>
            _workItems.DeleteOne(item => item.id == id);

        public void Remove() =>
            _workItems.DeleteMany(item => true);
    }
}