using System;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using TokenGenerationService.Common;

namespace TokenGenerationService.Models
{
    public class Token
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id;

        [BsonElement("TokenString")]
        public string TokenString;

        [BsonElement("ttl")]
        public int ttl;

        [BsonElement("email")]
        public string email;

        // somehow need to modify the accessibility level of this property...
        public string created;
        
        public Token(string email, Time t)
        {
            TokenString = GenerateToken(Utils.TOKEN_LENGTH);
            ttl = Utils.TimeToTtl(t);

            created = DateTime.Now.ToString();

            this.email = email;
        }

        private string GenerateToken(int length)
        {
            return new string(Enumerable.Repeat(Utils.CHARS, length)
              .Select(s => s[Utils.random.Next(s.Length)]).ToArray());
        }

        public void ExtendTime(Time t)
        {
            ttl += Utils.TimeToTtl(t);
        }
    }
}
