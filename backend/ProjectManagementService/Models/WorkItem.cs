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

        [BsonElement("timeEstimate")]
        public Time timeEstimate { get; set; }

        [BsonElement("timeLogged")]
        public Time timeLogged { get; set; }
        
        [BsonElement("currentBoardId")]
        public string currentBoardId { get; set; }

        [BsonElement("completed")]
        public bool completed { get; set; }

        public WorkItem()
        {
            name = "default_name";
            detail = "default_details";
            created = DateTime.Now.ToString();
            timeEstimate = new Time(1, 0, 0, 0);
            timeLogged = new Time();
            currentBoardId = null;
            completed = false;
        }

        public WorkItem(string n, string d, Time te, string? bid)
        {
            name = n;
            detail = d;
            created = DateTime.Now.ToString();
            timeEstimate = te;
            timeLogged = new Time();
            currentBoardId = bid ?? null;
            completed = false;
        }
    }

    
}
