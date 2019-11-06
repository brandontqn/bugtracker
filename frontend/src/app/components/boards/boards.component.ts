import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: Board[];

  newBoardName: string;

  constructor( private boardService: BoardService ) { }

  ngOnInit() {
    this.getBoards();
  }

  async getBoards() {
    (await this.boardService.getBoards())
      .subscribe(data => this.boards = data);
  }

  async addBoard(title: string) {
    const observable = await this.boardService.addBoard(title);
    
    observable.subscribe( (data: Board) => {
        this.boards.push(data);
      }
    );
  }

  async deleteBoard(id: string) {
    const observable = await this.boardService.deleteBoard(id);

    observable.subscribe( () =>
      this.boards = this.boards.filter( (board: Board) => board.id !== id)
    );
  }

}
