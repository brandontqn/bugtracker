import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';
import { Task } from './../models/task';
import { AppComponent } from 'src/app/app.component';
import { Time } from '../models/time';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + '/api/tasks/';

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return {
      Authorization : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  // CREATE
  async createTask(title: string, description: string, time: Time, boardId: string, tags: string[]) {
    const httpOptions = await this.getHeaders();
    const newTask = { title, description, time, boardId, tags };
    return this.http.post(this.currentEndpoint, newTask, { headers: httpOptions });
  }

  // READ
  async getTasks() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Task[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.get<Task>( url, { headers: httpOptions });
  }

  // UPDATE
  async updateTask(task: Task) {
    const httpOptions = await this.getHeaders();
    return this.http.patch(this.currentEndpoint, task, { headers: httpOptions });
  }

  // DELETE
  async deleteTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.delete(url, { headers: httpOptions });
  }
}
