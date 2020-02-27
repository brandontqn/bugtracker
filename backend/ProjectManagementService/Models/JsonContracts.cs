using System;
using System.Collections.Generic;

namespace ProjectManagementService.Models
{
    public class Tags
    {
        public List<string> tags { get; set; }

        public Tags()
        {
            tags = new List<string>();
        }
    }

    public class TaskMessage
    {
        public string title { get; set; }
        public string description { get; set; }
        public Time time { get; set; }
        public string currentBoardId { get; set; }
        public List<string> tags { get; set; }

        public TaskMessage()
        {
            title = "Default Title";
            description = "Default Description";
            time = new Time();
            currentBoardId = "";
            tags = new List<string>();
        }
    }

    public class BoardMessage
    {
        public string title { get; set; }
        public string description { get; set; }
        public string currentProjectId { get; set; }

        public BoardMessage()
        {
            title = "Default Title";
            description = "Default Description";
            currentProjectId = "";
        }
    }

    public class ProjectMessage
    {
        public string title { get; set; }
        public string description { get; set; }
        public List<string> boardIds { get; set; }

        public ProjectMessage()
        {
            title = "Default Title";
            description = "Default Description";
            boardIds = new List<string>();
        }
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
