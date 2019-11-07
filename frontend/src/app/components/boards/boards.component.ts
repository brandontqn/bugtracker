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
    });

    this._snackBar.open(title + " Added", "dismiss", {
      duration: 2000
    });
  }

  async deleteBoard(id: string) {
    (await this.boardService.deleteBoard(id))
    .subscribe( () => {
      this.boards = this.boards.filter( (board: Board) => board.id !== id);
    });

    this._snackBar.open("Delete", "dismiss", {
      duration: 2000
    });
  }

}
