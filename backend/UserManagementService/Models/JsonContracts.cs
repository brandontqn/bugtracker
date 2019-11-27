using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagementService.Models
{
    public class OktaRequest
    {
        public Profile profile { get; set; }
        public Credentials credentials { get; set; }

        public OktaRequest(Account account)
        {
            profile = new Profile(account);
            credentials = new Credentials(account);
        }
    }

    public class Profile
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string login { get; set; }

        public Profile(Account account)
        {
            firstName = account.firstName;
            lastName = account.lastName;
            email = account.email;
            login = account.login;
        }
    }

    public class Credentials
    {
        public Password password { get; set; }

        public Credentials(Account account)
        {
            password = new Password(account);
        }
    }

    public class Password
    {
        public string value { get; set; }

        public Password(Account account)
        {
            value = account.password;
        }
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

    public class Email
    {
        public string value { get; set; }
    }

    public class Account
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public string password { get; set; }
    }

    public class EmailValidated
    {
        public string email { get; set; }
        public bool validated { get; set; }
    }
}
