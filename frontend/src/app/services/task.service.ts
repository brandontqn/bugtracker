import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { Task } from './../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from TaskService!' );
  }

  private apiEndpoints = {
    mac: 'https://localhost:5001/api/workitems',
    windows: 'https://localhost:44359/api/workitems',
    docker: 'http://localhost:8080/api/workitems'
  };

  private currentEndpoint = this.apiEndpoints['windows'];

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return { 
      'Authorization' : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getTasks() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Task[]>( this.currentEndpoint, { headers: httpOptions } );
  }

  async getTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.get<Task>( url, { headers: httpOptions } );
  }

  async updateTask(task: Task) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + task.id;
    return this.http.patch(url, task, { headers: httpOptions } );
  }

  async createTask(name: string) {
    const httpOptions = await this.getHeaders();
    return this.http.post(this.currentEndpoint, { name: name, detail: "" }, { headers: httpOptions });
  }
}
