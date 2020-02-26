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

  public static allBoards: Board[];
  title: string;
  boards: Board[];

  constructor( private boardService: BoardService, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.title = 'All Boards';
    this.getBoards();
  }

  async getBoards() {
    (await this.boardService.getBoards())
    .subscribe(data => {
      this.boards = data;
      AllBoardsComponent.allBoards = this.boards;
    });
  }

  async onAdded(title: string) {
    (await this.boardService.addBoard(title))
    .subscribe( (data: Board) => {
      this.boards.push(data);
      AllBoardsComponent.allBoards.push(data);
      this.snackBar.open(title + ' added', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onDeleted(board: Board) {
    (await this.boardService.deleteBoard(board.id))
    .subscribe( () => {
      this.boards = this.boards.filter( (x: Board) => x.id !== board.id);
      AllBoardsComponent.allBoards = AllBoardsComponent.allBoards.filter( (x: Board) => x.id !== board.id);
      this.snackBar.open(board.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }
}
