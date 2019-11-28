import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { OktaAuthService } from '@okta/okta-angular';
import { Task } from './../models/task';
import { environment } from 'src/environments/environment';

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

  // protected currentEndpoint = environment.apiEndpoints.workItems.iis;
  protected currentEndpoint = environment.apiEndpoints.workItems.docker;

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
    console.log(task);
    return this.http.patch(url, task, { headers: httpOptions });
  }

  async createTask(name: string) {
    const httpOptions = await this.getHeaders();
    var time = { days: 3, hours: 0, minutes: 0, seconds: 0 };
    var newTask = { name: name, detail: "", time: time };
    return this.http.post(this.currentEndpoint, newTask, { headers: httpOptions });
  }

  async deleteTask(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.delete(url, { headers: httpOptions })
  }
}
