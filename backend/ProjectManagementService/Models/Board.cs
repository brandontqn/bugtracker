using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace ProjectManagementService.Models
{
    public interface IBoard
    {
        public string title { get; set; }

        public string description { get; set; }

        public List<string> itemIds { get; set; }
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

        [BsonElement("currentProjectId")]
        public string currentProjectId { get; set; }

        public Board()
        {
            title = "default_name";
            description = "default_details";
            itemIds = new List<string>();
            created = DateTime.Now.ToString();
            currentProjectId = null;
        }

        public Board(string title, string description, string? projectId)
        {
            this.title = title;
            this.description = description;
            itemIds = new List<string>();
            created = DateTime.Now.ToString();
            currentProjectId = projectId ?? null;
        }
    }
}
