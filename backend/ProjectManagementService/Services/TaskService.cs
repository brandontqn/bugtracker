using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

using ProjectManagementService.Models;


namespace ProjectManagementService.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<Task> _workItems;

        public TaskService(IDatabaseSettings settings)
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

            _workItems = database.GetCollection<Task>(settings.TasksCollectionName);
        }

        public List<Task> GetAll()
        {
            return _workItems.Find(item => true).ToList();
        }

        public Task Get(string id)
        {
            return _workItems.Find(item => item.id == id).FirstOrDefault();
        }

        public Task Create(string title, string description, Time time, string boardId)
        {
            Task item = new Task(title, description, time, boardId);

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

        public Task Update(Task updatedItem)
        {
            _workItems.ReplaceOne(x => x.id == updatedItem.id, updatedItem);

            return updatedItem;
        }

        public void Remove(string id) =>
            _workItems.DeleteOne(item => item.id == id);

        public void Remove() =>
            _workItems.DeleteMany(item => true);
    }
}