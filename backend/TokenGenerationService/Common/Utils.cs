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
    }
}
