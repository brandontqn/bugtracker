import { Task, ITask } from './../models/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class TaskService /*implements OnInit*/ {
  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from service!' );
  }

  // accessToken: string;

  // async ngOnInit() {
  //   this.accessToken = await this.oktaAuth.getAccessToken();
  //   // const headers = new HttpHeaders({ 
  //   //   'Authorization': 'Bearer ' + accessToken,
  //   //   'Content-type': 'application/json'
  //   // });
  // }
  
  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-type': 'application/json', 'Authorization': 'Bearer ' + accessToken})
  // };

  private apiEndpoints = {
    mac: 'https://localhost:5001/api/workitems',
    windows: 'https://localhost:44359/api/workitems',
    docker: 'http://localhost:8080/api/workitems'
  };

  private currentEndpoint = this.apiEndpoints['windows'];

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    console.log("inside getHeaders", accessToken);
    return { 
      'Authorization' : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getTasks() {
    const httpOptions = await this.getHeaders();
    console.log("inside getTasks", httpOptions);
    return this.http.get<ITask[]>( this.currentEndpoint, {headers: httpOptions});
  }

  async getTask(id: string) {
    // const accessToken = this.oktaAuth.getAccessToken();
    // const httpOptions = { 
    //   'Authorization': 'Bearer ' + accessToken,
    //   'Content-type': 'application/json'
    // };

    const httpOptions = await this.getHeaders();
    console.log("inside getTask/" + id, httpOptions);
    const url = this.currentEndpoint + '/' + id;
    return this.http.get<ITask>( url, {headers: httpOptions} );
  }

  async updateTask(task: Task) {
    // const accessToken = this.oktaAuth.getAccessToken();
    // const httpOptions = { 
    //   'Authorization': 'Bearer ' + accessToken,
    //   'Content-type': 'application/json'
    // };

    const httpOptions = await this.getHeaders();
    console.log("inside getTask/" + task.id, httpOptions);
    const url = this.currentEndpoint + '/' + task.id;
    return this.http.put(url, task, {headers: httpOptions});
  }
}
