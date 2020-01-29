using System;
namespace ProjectManagementService.Models
{
    public class Text
    {
        public string text { get; set; }
    }

    public class TitleDescriptionTime
    {
        public string title { get; set; }
        public string description { get; set; }
        public Time time { get; set; }
    }

    public class TitleDescription
    {
        public string title { get; set; }
        public string description { get; set; }
    }

    public class Time
    {
        public int days { get; set; }
        public int hours { get; set; }
        public int minutes { get; set; }
        public int seconds { get; set; }

        public Time() {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        public Time(int? d, int? h, int? m, int? s)
        {
            days = d ?? 0;
            hours = h ?? 0;
            minutes = m ?? 0;
            seconds = s ?? 0;
        }
    }
}
