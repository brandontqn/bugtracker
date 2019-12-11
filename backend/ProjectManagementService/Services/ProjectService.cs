using MongoDB.Driver;
using ProjectManagementService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementService.Services
{
    public class ProjectService
    {
        private readonly IMongoCollection<Project> _projects;

        public ProjectService(IDatabaseSettings settings)
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

            _projects = database.GetCollection<Project>(settings.ProjectsCollectionName);
        }

        public List<Project> GetAll()
        {
            return _projects.Find(item => true).ToList();
        }

        public Project Get(string id)
        {
            return _projects.Find(item => item.id == id).FirstOrDefault();
        }

        public Project Create(string title, string description)
        {
            Project item = new Project(title, description);

            try
            {
                _projects.InsertOne(item);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e);
            }

            return item;
        }

        public Project UpdateTitle(string id, string title)
        {
            Project item = _projects.Find(x => x.id == id).FirstOrDefault();

            item.title = title;
            _projects.ReplaceOne(x => x.id == item.id, item);

            return item;
        }

        public Project UpdateDescription(string id, string description)
        {
            Project item = _projects.Find(x => x.id == id).FirstOrDefault();

            item.description = description;
            _projects.ReplaceOne(x => x.id == item.id, item);

            return item;
        }

        public Project AddBoard(string projectId, string boardId)
        {
            Project project = _projects.Find(x => x.id == projectId).FirstOrDefault();

            project.boardIds = project.boardIds.Append(boardId).ToList();
            _projects.ReplaceOne(x => x.id == projectId, project);

            return project;
        }

        public Project DeleteBoard(string projectId, string boardId)
        {
            Project project = _projects.Find(x => x.id == projectId).FirstOrDefault();

            project.boardIds = project.boardIds.Where(x => x != boardId).ToList();
            _projects.ReplaceOne(x => x.id == projectId, project);

            return project;
        }

        public void Remove(string id) =>
            _projects.DeleteOne(item => item.id == id);

        public void Remove() =>
            _projects.DeleteMany(item => true);
    }
}
