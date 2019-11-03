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

        public WorkItemService(IWorkItemsDatabaseSettings settings)
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
            //var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _workItems = database.GetCollection<WorkItem>(settings.WorkItemsCollectionName);
        }

        public List<WorkItem> GetAll()
        {
            return _workItems.Find(item => true).ToList();
        }

        public WorkItem Get(string id)
        {
            return _workItems.Find(token => token.id == id).FirstOrDefault();
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

        // public WorkItem ExtendTime(TokenTime tt)
        // {
        //     Token newToken = _tokens.Find(token => token.TokenString == tt.tokenString).FirstOrDefault();
        //     newToken.ExtendTime(tt.time);
        //     _tokens.ReplaceOne(token => token.TokenString == tt.tokenString, newToken);

        //     return newToken;
        // }

        // public bool Validate(string tokenString)
        // {
        //     Token newToken = _tokens.Find(token => token.TokenString == tokenString).FirstOrDefault();
            
        //     // token is invalid (doesn't exist) or has already expired (and removed from the database with TTL)
        //     if (newToken == null)
        //     {
        //         return false;
        //     }

        //     // token is valid
        //     Remove(newToken.TokenString);
        //     return true;
        // }

        public void Remove(string id) =>
            _workItems.DeleteOne(item => item.id == id);

        public void Remove() =>
            _workItems.DeleteMany(item => true);
    }
}