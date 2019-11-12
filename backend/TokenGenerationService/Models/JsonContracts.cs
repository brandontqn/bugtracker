namespace TokenGenerationService.Models
{
    public class TokenString
    {
        public string tokenString;
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

    public class TokenTime
    {
        public string tokenString;
        public Time time;
    }
}
