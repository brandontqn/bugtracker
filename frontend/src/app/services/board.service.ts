import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) { }

  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + '/api/boards/';

  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return {
      Authorization : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  // CREATE
  async createBoard(title: string, description: string, currentProjectId: string) {
    const httpOptions = await this.getHeaders();
    console.log('board.service currentProjectId: ', currentProjectId);
    return this.http.post(this.currentEndpoint, { title, description, currentProjectId }, { headers: httpOptions } );
  }

  // READ
  async getBoards() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Board[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.get<Board>( url, { headers: httpOptions });
  }

  // UPDATE
  async updateBoard(board: Board) {
    const httpOptions = await this.getHeaders();
    return this.http.patch(this.currentEndpoint, board, { headers: httpOptions });
  }

  // DELETE
  async deleteBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + id;
    return this.http.delete(url, { headers: httpOptions });
  }
}
