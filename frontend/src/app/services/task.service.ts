import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';
import { Task } from './../models/task';
import { AppComponent } from 'src/app/app.component';

const seconds = 1000;
const minutes = 1000 * 60;
const hours = minutes * 60;
const days = hours * 24;
const years = days * 365;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from TaskService!' );
  }

  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + '/api/tasks';

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return {
      Authorization : 'Bearer ' + accessToken,
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

  async createTask(title: string) {
    const httpOptions = await this.getHeaders();
    const time = { days: 3, hours: 0, minutes: 0, seconds: 0 };
    const newTask = { title: title, description: '', time: time };
    return this.http.post(this.currentEndpoint, newTask, { headers: httpOptions });
  }

  async deleteTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.delete(url, { headers: httpOptions });
  }
}
