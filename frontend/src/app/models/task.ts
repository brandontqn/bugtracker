import { Time } from 'src/app/models/time';

export class Task {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    timeEstimate: Time;
    timeLogged: Time;
    currentBoardId: string;
    completed: boolean;
    tags: string[];
}
