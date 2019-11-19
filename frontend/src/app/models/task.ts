import { Time } from 'src/app/models/time';

export class Task {
    id: string;
    name: string;
    detail: string;
    created: string;
    timeEstimate: Time; 
    timeLogged: Time;
}
