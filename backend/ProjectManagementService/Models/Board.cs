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

        [BsonElement("createdAt")]
        public string createdAt { get; set; }

        [BsonElement("currentProjectId")]
        public string currentProjectId { get; set; }

        public Board()
        {
            title = "default_name";
            description = "default_details";
            itemIds = new List<string>();
            createdAt = DateTime.Now.ToString();
            currentProjectId = null;
        }

        public Board(string t, string d, string? projectId)
        {
            title = t;
            description = d;
            itemIds = new List<string>();
            createdAt = DateTime.Now.ToString();
            currentProjectId = projectId ?? null;
        }
    }
}
