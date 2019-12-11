import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board';
import { AppComponent } from 'src/app/app.component'

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private _oktaAuth: OktaAuthService, private _http: HttpClient) {
    console.log( 'Hello from BoardService!' );
  }
  
  protected currentEndpoint = AppComponent.env.apiEndpoints.projectManagementService + "/api/boards";
  
  async getHeaders() {
    const accessToken = await this._oktaAuth.getAccessToken();
    return { 
      'Authorization' : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getBoards() {
    const httpOptions = await this.getHeaders();
    return this._http.get<Board[]>( this.currentEndpoint, { headers: httpOptions });
  }

  async getBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this._http.get<Board>( url, { headers: httpOptions });
  }

  async addBoard(title: string) {
    const httpOptions = await this.getHeaders();
    return this._http.post(this.currentEndpoint, { title: title, description: "" }, { headers: httpOptions } );
  }

  async updateBoard(board: Board) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + board.id;
    return this._http.patch(url, board, { headers: httpOptions });
  }

  async addTask(boardId: string, itemId: String) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/items/add/' + boardId;
    return this._http.put(url, { text: itemId }, { headers: httpOptions });
  }

  async deleteBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this._http.delete(url, { headers: httpOptions });
  }

  async deleteTask(boardId: string, itemId: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/items/delete/' + boardId;
    return this._http.put(url, { text: itemId }, { headers: httpOptions });
  }
}
