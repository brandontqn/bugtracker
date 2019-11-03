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

    private apiEndpoint = 'https://localhost:5001/api/workitems';
    // private apiEndpoint = 'http://localhost:8080/api/workitems';
    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>( this.apiEndpoint );
    }
}
