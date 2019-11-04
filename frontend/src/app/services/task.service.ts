import { Task, ITask } from './../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
    console.log( 'Hello from service!' );
  }

    private httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json'})
    };

    private apiEndpoints = {
      mac: 'https://localhost:5001/api/workitems',
      windows: 'https://localhost:44359/api/workitems',
      docker: 'http://localhost:8080/api/workitems'
    };

    private currentEndpoint = this.apiEndpoints['windows'];

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>( this.currentEndpoint );
    }

    getTask(name: string): Observable<ITask> {
      const url = this.currentEndpoint + '/' + name;
      return this.http.get<ITask>( url );
    }

    updateTask(task: Task): Observable<any> {
      const url = this.currentEndpoint + '/' + task.name;
      return this.http.put(url, task, this.httpOptions);
    }
}
