using System;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

using TokenApi.Common;

namespace TokenApi.Models
{
    public class Token
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id;

        [BsonElement("TokenString")]
        public string TokenString;

        [BsonElement("ttl")]
        public int ttl;

        // somehow need to modify the accessibility level of this property...
        public string created;
        
        public Token(Time t)
        {
            TokenString = GenerateToken(Utils.TOKEN_LENGTH);
            ttl = TimeToTtl(t);

            created = DateTime.Now.ToString();
        }

        public void ExtendTime(Time t)
        {
            ttl += TimeToTtl(t);
        }

        public Time TimeRemaining()
        {
            TimeSpan timeToLive = new TimeSpan(0, 0, ttl);
            TimeSpan timeGoneBy = DateTime.Now - DateTime.Parse(created);

            return TimeSpanToTime(timeToLive.Subtract(timeGoneBy));
        }
        
        public bool MeetsMinimumTimeRequirement(Time t)
        {
            if (TimeToTtl(t) < Utils.MIN_TTL)
            {
                return false;
            }
            return true;
        }

        public TokenTime ToTokenTime()
        {
            return new TokenTime
            {
                tokenString = TokenString,
                time = TimeRemaining()
            };
        }

        private string GenerateToken(int length)
        {
            return new string(Enumerable.Repeat(Utils.CHARS, length)
              .Select(s => s[Utils.random.Next(s.Length)]).ToArray());
        }
                
        private int DaysToSeconds(int days)
        {
            return days * Utils.HOURS_PER_DAY * Utils.MINUTES_PER_HOUR * Utils.SECONDS_PER_MINUTE;
        }

        private int HoursToSeconds(int hours)
        {
            return hours * Utils.MINUTES_PER_HOUR * Utils.SECONDS_PER_MINUTE;
        }

        private int MinutesToSeconds(int minutes)
        {
            return minutes * Utils.SECONDS_PER_MINUTE;
        }
        
        private Time TtlToTime()
        {
            int days = ttl / 86400;
            int hours = (ttl % 86400) / 3600;
            int minutes;
            try
            {
                minutes = (ttl % ((ttl % 86400) / 3600)) / 60;
            }
            catch
            {
                minutes = 0;
            }
            int seconds;
            try
            {
                seconds = (ttl % ((ttl % ((ttl % 86400) / 3600)) / 60));
            }
            catch
            {
                seconds = 0;
            }

            return new Time(days, hours, minutes, seconds);
        }

        private int TimeToTtl(Time t)
        {
            return DaysToSeconds(t.days) + HoursToSeconds(t.hours) + MinutesToSeconds(t.minutes) + t.seconds;
        }

        private TimeSpan TimeToTimeSpan(Time t)
        {
            return new TimeSpan(t.days, t.hours, t.minutes, t.seconds);
        }

        private Time TimeSpanToTime(TimeSpan ts)
        {
            return new Time(ts.Days, ts.Minutes, ts.Seconds, ts.Seconds);
        }
    }
}
