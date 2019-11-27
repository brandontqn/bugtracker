using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace ProjectManagementService.Models
{
    public interface IBoard
    {
        public string title { get; set; }

        public string description { get; set; }

        public List<string> itemIds { get; set; }

        public string created { get; set; }
    }

    public class Board : IBoard
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        [BsonElement("title")]
        public string title { get; set; }

        [BsonElement("description")]
        public string description { get; set; }

        [BsonElement("itemIds")]
        public List<string> itemIds { get; set; }

        [BsonElement("created")]
        public string created { get; set; }

        public Board(string t, string d)
        {
            title = t;
            description = d;
            itemIds = new List<string>();
        }
    }
}
