using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementService.Models
{
    public class OktaRequest
    {
        public string eventId { get; set; }
        public string eventTime { get; set; }
        public string eventType { get; set; }
        public string eventTypeVersion { get; set; }
        public string contentType { get; set; }
        public string cloudEventVersion { get; set; }
        public string source { get; set; }
        public Data data { get; set; }
    }

    public class Data
    {
        public Context context { get; set; }
        public UserProfile userProfile { get; set; }
        public string action { get; set; }
    }

    public class Context
    {
        public Request request { get; set; }
    }

    public class Request
    {
        public string id { get; set; }
        public string method { get; set; }
        public Url url { get; set; }
        public string ipAddress { get; set; }
    }

    public class Url
    {
        public string value { get; set; }
    }

    public class UserProfile
    {
        public string lastName { get; set; }
        public string firstName { get; set; }
        public string login { get; set; }
        public string email { get; set; }
    }

    public class OktaResponse
    {
        public List<Command> commands { get; set; }
    }

    public class Command
    {
        public string type { get; set; }
        public string registration { get; set; }
    }

    public class TokenTime
    {
        public string tokenString;
        public Time time;
    }

    public class Time
    {
        public int days;
        public int hours;
        public int minutes;
        public int seconds;

        public Time(int? d, int? h, int? m, int? s)
        {
            days = d ?? 0;
            hours = h ?? 0;
            minutes = m ?? 0;
            seconds = s ?? 0;
        }
    }
}
