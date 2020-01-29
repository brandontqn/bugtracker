import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { OktaAuthService } from '@okta/okta-angular';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from ProjectService!' );
  }

  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + '/api/projects';

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getProjects() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Project[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getProject(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/details/' + id;
    return this.http.get<Project>( url, { headers: httpOptions } );
  }

  async addProject(title: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/new';
    return this.http.post(url, { text: title }, { headers: httpOptions });
  }

  async deleteProject(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/delete/' + id;
    return this.http.post(url, '', { headers: httpOptions });
  }

  async updateProject(project: Project) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/update/' + project.id;
    return this.http.post(url, { title: project.title, description: project.description }, { headers: httpOptions } );
  }

  async addBoard(projectId: string, boardId: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/add/' + projectId + '/' + boardId;
    return this.http.post(url, '', { headers: httpOptions });
  }

  async deleteBoard(projectId: string, boardId: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/delete/' + projectId + '/' + boardId;
    return this.http.post(url, '', { headers: httpOptions });
  }
}
