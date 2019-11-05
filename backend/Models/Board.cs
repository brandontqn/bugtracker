using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public interface IBoard
    {
        public string title { get; set; }

        public string description { get; set; }

        public WorkItem[] items { get; set; }
    }

    public class Board : IBoard
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }

        public string title { get; set; }

        public string description { get; set; }

        public WorkItem[] items { get; set; }

        public Board(string t, string d)
        {
            title = t;
            description = d;
        }
    }
}
