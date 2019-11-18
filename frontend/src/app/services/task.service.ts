import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Task } from './../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from TaskService!' );
  }

  protected currentEndpoint = environment.development.localhostEndpoints.workItems.iis;

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return { 
      'Authorization' : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getTasks() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Task[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.get<Task>( url, { headers: httpOptions });
  }

  async updateTask(task: Task) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + task.id;
    return this.http.patch(url, task, { headers: httpOptions });
  }

  async createTask(name: string) {
    const httpOptions = await this.getHeaders();
    return this.http.post(this.currentEndpoint, { name: name, detail: "" }, { headers: httpOptions });
  }

  async deleteTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.delete(url, { headers: httpOptions })
  }
}
