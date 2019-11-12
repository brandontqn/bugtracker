using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;

using TokenApi.Models;


namespace TokenApi.Services
{
    public class TokenService
    {
        private readonly IMongoCollection<Token> _tokens;

        public TokenService(ITokenDatabaseSettings settings)
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

            _tokens = database.GetCollection<Token>(settings.TokenCollectionName);
        }

        public List<Token> Get()
        {
            return _tokens.Find(token => true).ToList();
        }

        public Token Get(string tokenString)
        {
            return _tokens.Find(token => token.TokenString == tokenString).FirstOrDefault();
        }

        public Token Create(Time t)
        {
            Token token = new Token(t);

            // token is not unique, already exists in the database, create a new token
            while (Get(token.TokenString) != null)
            {
                token = new Token(t);
            }

            try
            {
                _tokens.InsertOne(token);
            }
            catch (MongoWriteException e)
            {
                Console.WriteLine(e);
            }
            return token;
        }

        public Token ExtendTime(TokenTime tt)
        {
            Token newToken = _tokens.Find(token => token.TokenString == tt.tokenString).FirstOrDefault();
            newToken.ExtendTime(tt.time);
            _tokens.ReplaceOne(token => token.TokenString == tt.tokenString, newToken);

            return newToken;
        }

        public bool Validate(string tokenString)
        {
            Token newToken = _tokens.Find(token => token.TokenString == tokenString).FirstOrDefault();
            
            // token is invalid (doesn't exist) or has already expired (and removed from the database with TTL)
            if (newToken == null)
            {
                return false;
            }

            // token is valid
            Remove(newToken.TokenString);
            return true;
        }

        public void Remove(string tokenString) =>
            _tokens.DeleteOne(token => token.TokenString == tokenString);

        public void Remove() =>
            _tokens.DeleteMany(token => true);
    }
}
