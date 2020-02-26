import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + '/api/projects/';

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return {
      Authorization: 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  // CREATE
  async createProject(title: string, description: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint;
    return this.http.post(url, { title, description }, { headers: httpOptions });
  }

  // READ
  async getProjects() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Project[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getProject(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.get<Project>( url, { headers: httpOptions } );
  }

  // UPDATE
  async updateProject(project: Project) {
    const httpOptions = await this.getHeaders();
    return this.http.patch(this.currentEndpoint, project, { headers: httpOptions });
  }

  // DELETE
  async deleteProject(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.delete(url, { headers: httpOptions });
  }
}
