export class Time {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(days: number, hours: number, minutes: number, seconds: number) {
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    public static add(t1: Time, t2: Time): Time {
        return new Time(t1.days + t2.days,
                        t1.hours + t2.hours,
                        t1.minutes + t2.minutes,
                        t1.seconds + t2.seconds);
    }
}
