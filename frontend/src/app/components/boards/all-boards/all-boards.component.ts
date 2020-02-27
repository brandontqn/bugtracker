import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardService } from '../../../services/board.service';
import { Board } from '../../../models/board';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.scss']
})
export class AllBoardsComponent implements OnInit {

  public static allBoards: Board[];
  title: string;
  boards: Board[];

  constructor(
    private boardService: BoardService,
    private snackBar: MatSnackBar ) { }

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

  async onAdded(board: { title: string, description: string, currentProjectId: string }) {
    (await this.boardService.createBoard(board.title, board.description, board.currentProjectId))
    .subscribe( (data: Board) => {
      this.boards.push(data);
      AllBoardsComponent.allBoards.push(data);
      this.snackBar.open(board.title + ' added', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onDeleted(boardId: string) {
    (await this.boardService.deleteBoard(boardId))
    .subscribe(() => {
      const deletedBoard = this.boards.filter((x: Board) => x.id === boardId)[0];
      this.boards = this.boards.filter((x: Board) => x.id !== boardId);
      AllBoardsComponent.allBoards = this.boards;
      this.snackBar.open(deletedBoard.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }
}
