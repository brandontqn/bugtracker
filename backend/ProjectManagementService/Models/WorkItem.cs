using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

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

        [BsonElement("created")]
        public string created { get; set; }

        [BsonElement("estimation")]
        public Time time { get; set; }

        public WorkItem(string name, string detail, Time timeEstimation)
        {
            this.name = name;
            this.detail = detail;
            this.created = DateTime.Now.ToString();
            this.time = timeEstimation;
        }
    }

    
}
