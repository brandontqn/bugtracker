import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient } from '@angular/common/http';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private oktaAuth: OktaAuthService, private http: HttpClient) {
    console.log( 'Hello from BoardService!' );
  }

  private apiEndpoints = {
    mac: 'https://localhost:5001/api/boards',
    windows: 'https://localhost:44359/api/boards',
    docker: 'http://localhost:8080/api/boards'
  };

  private currentEndpoint = this.apiEndpoints['windows'];

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
    return this.http.get<Board>( url, { headers: httpOptions } );
  }

  // WIP
  async updateBoard(board: Board) {
    const httpOptions = await this.getHeaders();
    const url = this.currentEndpoint + '/title/' + board.id;
    return this.http.put(url, board, { headers: httpOptions } );
  }
}
