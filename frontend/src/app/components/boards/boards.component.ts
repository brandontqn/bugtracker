import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: Board[];

  newBoardName: string;

  constructor( private boardService: BoardService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getBoards();
  }

  async getBoards() {
    (await this.boardService.getBoards())
    .subscribe(data => {
      this.boards = data
    });
  }

  async addBoard(title: string) {
    (await this.boardService.addBoard(title))
    .subscribe( (data: Board) => {
        this.boards.push(data);
        this._snackBar.open(title + " added", "dismiss", {
          duration: 2000
        });
    });
  }

  async deleteBoard(board: Board) {
    (await this.boardService.deleteBoard(board.id))
    .subscribe( () => {
      this.boards = this.boards.filter( (x: Board) => x.id !== board.id);
      this._snackBar.open(board.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
