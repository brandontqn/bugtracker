using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectManagementService.Models
{
    public interface IWorkItem
    {
        public string name { get; set; }

        public string detail { get; set; }
    }

    public class WorkItem : IWorkItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        
        [BsonElement("name")]
        public string name { get; set; }

        [BsonElement("detail")]
        public string detail { get; set; }

        public WorkItem(string n, string d)
        {
            name = n;
            detail = d;
        }
    }

    
}
