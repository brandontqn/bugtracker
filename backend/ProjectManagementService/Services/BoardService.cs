using ProjectManagementService.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManagementService.Services
{
    public class BoardService
    {
        private readonly IMongoCollection<Board> _boards;

        public BoardService(IDatabaseSettings settings)
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

            _boards = database.GetCollection<Board>(settings.BoardsCollectionName);
        }

        #region CREATE
        public Board Create(string title, string description, string projectId)
        {
            Board item = new Board(title, description, projectId);

            try
            {
                _boards.InsertOne(item);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e);
            }

            return item;
        }
        #endregion

        #region READ
        public List<Board> GetAll()
        {
            return _boards.Find(item => true).ToList();
        }

        public Board Get(string id)
        {
            return _boards.Find(item => item.id == id).FirstOrDefault();
        }
        #endregion

        #region UPDATE
        public Board Update(Board updatedBoard)
        {
            _boards.ReplaceOne(x => x.id == updatedBoard.id, updatedBoard);
            return updatedBoard;
        }

        #endregion

        #region DELETE
        public string Remove(string id)
        {
            _boards.DeleteOne(item => item.id == id);
            return id;
        }

        public void Remove() =>
            _boards.DeleteMany(item => true);
        #endregion
    }
}
