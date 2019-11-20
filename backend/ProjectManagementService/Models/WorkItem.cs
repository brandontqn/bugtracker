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
            this.name = "default_name";
            this.detail = "default_details";
            this.created = DateTime.Now.ToString();
            this.timeEstimate = new Time(1, 0, 0, 0);
            this.timeLogged = new Time();
            this.currentBoardId = null;
            this.completed = false;
        }

        public WorkItem(string name, string detail, Time timeEstimation, string? boardId)
        {
            this.name = name;
            this.detail = detail;
            this.created = DateTime.Now.ToString();
            this.timeEstimate = timeEstimation;
            this.timeLogged = new Time();
            this.currentBoardId = boardId ?? null;
            this.completed = false;
        }
    }

    
}
