import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from BoardService!' );
  }
  
  protected currentEndpoint = environment.development.localhostEndpoints.boards.iis;
  
  async getHeaders() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return { 
      'Authorization' : 'Bearer ' + accessToken,
      'Content-type': 'application/json'
    };
  }

  async getBoards() {
    const httpOptions = await this.getHeaders();
    return this.http.get<Board[]>( this.currentEndpoint, {headers: httpOptions});
  }

  async getBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.get<Board>( url, { headers: httpOptions });
  }

  async addBoard(title: string) {
    const httpOptions = await this.getHeaders();
    return this.http.post(this.currentEndpoint, { title: title, description: "" }, { headers: httpOptions } );
  }

  async updateBoard(board: Board) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + board.id;
    return this.http.patch(url, board, { headers: httpOptions });
  }

  async addTask(boardId: string, itemId: String) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/items/add/' + boardId;
    return this.http.put(url, { text: itemId }, { headers: httpOptions });
  }

  async deleteBoard(id: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/' + id;
    return this.http.delete(url, { headers: httpOptions });
  }

  async deleteTask(boardId: string, itemId: string) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/items/delete/' + boardId;
    return this.http.put(url, { text: itemId }, { headers: httpOptions });
  }
}
