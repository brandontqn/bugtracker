using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

using ProjectManagementService.Models;


namespace ProjectManagementService.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<Task> _tasks;

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

            _tasks = database.GetCollection<Task>(settings.TasksCollectionName);
        }

        #region CREATE
        public Task Create(string title, string description, Time time, string boardId, List<string> tags)
        {
            Task item = new Task(title, description, time, boardId, tags);

            try
            {
                _tasks.InsertOne(item);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e);
            }

            return item;
        }
        #endregion

        #region READ
        public List<Task> GetAll()
        {
            return _tasks.Find(item => true).ToList();
        }

        public Task Get(string id)
        {
            return _tasks.Find(item => item.id == id).FirstOrDefault();
        }
        #endregion

        #region UPDATE
        public Task Update(Task updatedTask)
        {
            _tasks.ReplaceOne(x => x.id == updatedTask.id, updatedTask);
            return updatedTask;
        }
        #endregion

        #region DELETE
        public void Remove(string id) =>
            _tasks.DeleteOne(item => item.id == id);

        public void Remove() =>
            _tasks.DeleteMany(item => true);
        #endregion
    }
}