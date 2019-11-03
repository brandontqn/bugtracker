using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class WorkItem
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        
        [BsonElement("name")]
        public string name { get; set; }

        [BsonElement("details")]
        public string details { get; set; }

        public WorkItem(string name, string details)
        {
            this.name = name;
            this.details = details;
        }
    }
}
