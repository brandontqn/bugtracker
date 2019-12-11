import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.scss']
})
export class AllBoardsComponent implements OnInit {

  public static boards: Board[];
  title: string;
  boards: Board[];

  constructor( private _boardService: BoardService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.title = "All Boards"
    this.getBoards();
  }

  async getBoards() {
    (await this._boardService.getBoards())
    .subscribe(data => {
      this.boards = data;
      AllBoardsComponent.boards = this.boards;
    });
  }

  async onAdded(title: string) {
    (await this._boardService.addBoard(title))
    .subscribe( (data: Board) => {
      this.boards.push(data);
      AllBoardsComponent.boards.push(data);
      this._snackBar.open(title + " added", "dismiss", {
        duration: 2000
      });
    });
  }

  async onDeleted(board: Board) {
    (await this._boardService.deleteBoard(board.id))
    .subscribe( () => {
      this.boards = this.boards.filter( (x: Board) => x.id !== board.id);
      AllBoardsComponent.boards = AllBoardsComponent.boards.filter( (x: Board) => x.id !== board.id);
      this._snackBar.open(board.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
