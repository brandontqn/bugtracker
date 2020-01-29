using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace ProjectManagementService.Models
{
    public interface ITask
    {
        public string title { get; set; }

        public string description { get; set; }
    }

    public class Task : ITask
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        
        [BsonElement("title")]
        public string title { get; set; }

        [BsonElement("description")]
        public string description { get; set; }

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

        public Task()
        {
            title = "default_name";
            description = "default_details";
            created = DateTime.Now.ToString();
            timeEstimate = new Time(1, 0, 0, 0);
            timeLogged = new Time();
            currentBoardId = null;
            completed = false;
        }

        public Task(string title, string description, Time time, string? boardId)
        {
            this.title = title;
            this.description = description;
            created = DateTime.Now.ToString();
            timeEstimate = time;
            timeLogged = new Time();
            currentBoardId = boardId ?? null;
            completed = false;
        }
    }

    
}
