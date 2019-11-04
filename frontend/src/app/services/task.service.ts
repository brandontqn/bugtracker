import { Task, ITask } from './../models/task';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
    console.log( 'Hello from service!' );
  }

    // private apiEndpoint = 'https://localhost:5001/api/workitems'; //mac
    private apiEndpoint = 'https://localhost:44359/api/workitems'; //windows
    // private apiEndpoint = 'http://localhost:8080/api/workitems'; //docker

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>( this.apiEndpoint );
    }

    getTask(name: string): Observable<ITask> {
      return this.http.get<ITask>( 'https://localhost:44359/api/workitems/' + name );
    }
}
