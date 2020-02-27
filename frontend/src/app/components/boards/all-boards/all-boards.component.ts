import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../services/project.service';
import { BoardService } from '../../../services/board.service';
import { Project } from '../../../models/project';
import { Board } from '../../../models/board';

@Component({
  selector: 'app-all-boards',
  templateUrl: './all-boards.component.html',
  styleUrls: ['./all-boards.component.scss']
})
export class AllBoardsComponent implements OnInit {

  title: string;
  boards: Board[];

  constructor(
    private projectService: ProjectService,
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
    });
  }

  async onAdded(data: { title: string, description: string, currentProjectId: string }) {
    (await this.boardService.createBoard(data.title, data.description, data.currentProjectId))
    .subscribe(async (board: Board) => {
      (await this.projectService.getProject(board.currentProjectId))
      .subscribe(async (project: Project) => {
        (await this.projectService.updateProject(project))
        .subscribe(() => {
          this.boards.push(board);
          project.boardIds.push(board.id);
          this.snackBar.open(board.title + ' added', 'dismiss', {
            duration: 2000
          });
        });
      });
    });
  }

  async onDeleted(boardId: string) {
    (await this.boardService.deleteBoard(boardId))
    .subscribe(() => {
      const deletedBoard = this.boards.filter((x: Board) => x.id === boardId)[0];
      this.boards = this.boards.filter((x: Board) => x.id !== boardId);
      this.snackBar.open(deletedBoard.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }
}
