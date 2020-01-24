using System;

using TokenGenerationService.Models;

namespace TokenGenerationService.Common
{
    public static class Utils
    {
        // Token configuration defaults
        public const int TOKEN_LENGTH = 20;
        public static Time DEFAULT_TIME = new Time(7, 0, 0, 0);
        public static Time MIN_TIME = new Time(0, 1, 0, 0); // 1 hour
        public static int MIN_TTL = MINUTES_PER_HOUR * SECONDS_PER_MINUTE; // 1 hour

        // Random token generation
        public static Random random = new Random();
        public const string CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        // Defining magic numbers
        public const int HOURS_PER_DAY = 24;
        public const int MINUTES_PER_HOUR = 60;
        public const int SECONDS_PER_MINUTE = 60;

        // Helper functions
        public static bool MeetsMinimumTimeRequirement(Time t)
        {
            if (TimeToTtl(t) < MIN_TTL)
            {
                return false;
            }
            return true;
        }

        public static TokenTime ToTokenTime(Token t)
        {
            return new TokenTime
            {
                tokenString = t.TokenString,
                time = TimeRemaining(t.created, t.ttl)
            };
        }

        public static int DaysToSeconds(int days)
        {
            return days * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
        }

        public static int HoursToSeconds(int hours)
        {
            return hours * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
        }

        public static int MinutesToSeconds(int minutes)
        {
            return minutes * SECONDS_PER_MINUTE;
        }

        public static Time TtlToTime(int ttl)
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

        public static int TimeToTtl(Time t)
        {
            return DaysToSeconds(t.days) + HoursToSeconds(t.hours) + MinutesToSeconds(t.minutes) + t.seconds;
        }

        public static TimeSpan TimeToTimeSpan(Time t)
        {
            return new TimeSpan(t.days, t.hours, t.minutes, t.seconds);
        }

        public static Time TimeSpanToTime(TimeSpan ts)
        {
            return new Time(ts.Days, ts.Hours, ts.Minutes, ts.Seconds);
        }

        public static Time TimeRemaining(string created, int ttl)
        {
            TimeSpan timeToLive = new TimeSpan(0, 0, ttl);
            TimeSpan timeGoneBy = DateTime.Now - DateTime.Parse(created);

            return TimeSpanToTime(timeToLive.Subtract(timeGoneBy));
        }
    }
}
