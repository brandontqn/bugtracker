import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Board } from 'src/app/models/board';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  panelOpenState = false;
  project: Project;
  boardsTitle: string;
  boards: Board[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private boardService: BoardService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.boardsTitle = 'Boards';
    this.getProject();
  }

  async getProject() {
    const id = this.route.snapshot.paramMap.get('id');

    (await this.projectService.getProject(id))
    .subscribe( (data: Project) => {
      this.project = data;
      this.getBoards();
    });
  }

  async getBoards() {
    (await this.boardService.getBoards())
    .subscribe( (data: Board[]) =>
      this.boards = data.filter( (board: Board) => this.project.boardIds.includes(board.id))
    );
  }

  async onAdded(title: string) {
    (await this.boardService.addBoard(title))
    .subscribe( async (board: Board) => {
      (await this.projectService.addBoard(this.project.id, board.id))
      .subscribe( () => {
        this.getBoards();
        this.project.boardIds.push(board.id);
        this.snackBar.open(title + ' added', 'dismiss', {
          duration: 2000
        });
      });
    });
  }

  async onDeleted(board: Board) {
    (await this.projectService.deleteBoard(this.project.id, board.id))
    .subscribe(async () => {
      this.getBoards();
      this.project.boardIds = this.project.boardIds.filter( (boardId: string) => boardId !== board.id );
      board.currentProjectId = null;
      (await this.boardService.updateBoard(board))
      .subscribe(() => {
        this.snackBar.open(board.title + ' deleted', 'dismiss', {
          duration: 2000
        });
      });
    });
  }

  async save() {
    (await this.projectService.updateProject(this.project))
    .subscribe( () => {
      this.snackBar.open(this.project.title + ' saved', 'dismiss', {
        duration: 2000
      });
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
