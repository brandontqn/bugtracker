using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectManagementService.Models
{
    public interface IProject
    {
        public string title { get; set; }
        public string description { get; set; }
        public List<string> boardIds { get; set; }
        public string createdAt { get; set; }
    }

    public class Project : IProject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("title")]
        public string title { get; set; }

        [BsonElement("description")]
        public string description { get; set; }

        [BsonElement("boardIds")]
        public List<string> boardIds { get; set; }

        [BsonElement("created")]
        public string createdAt { get; set; }

        public Project(string t, string d)
        {
            title = t;
            description = d;
            boardIds = new List<string>();
            createdAt = DateTime.Now.ToString();
        }
    }
}
