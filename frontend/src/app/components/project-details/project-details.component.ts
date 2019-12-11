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
    private _route: ActivatedRoute,
    private _projectService: ProjectService,
    private _boardService: BoardService,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.boardsTitle = "Boards";
    this.getProject();
  }

  async getProject() {
    const id = this._route.snapshot.paramMap.get('id');

    (await this._projectService.getProject(id))
    .subscribe( (data: Project) => {
      this.project = data;
      this.getBoards();
    });
  }

  async getBoards() {
    (await this._boardService.getBoards())
    .subscribe( (data: Board[]) =>
      this.boards = data.filter( (board: Board) => this.project.boardIds.includes(board.id))
    );
  }

  async onAdded(title: string) {
    (await this._boardService.addBoard(title))
    .subscribe( async (data: Board) => {
      (await this._projectService.addBoard(this.project, data))
      .subscribe( () => {
        this.getBoards();
        this.project.boardIds.push(data.id);
        this._snackBar.open(title + " added", "dismiss", {
          duration: 2000
        });
      });
    });
  }

  async onDeleted(board: Board) {
    (await this._projectService.deleteBoard(this.project, board))
    .subscribe( () => {
      this.getBoards();
      this.project.boardIds = this.project.boardIds.filter( (boardId: string) => boardId !== board.id );
      this._snackBar.open(board.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }

  async save() {
    (await this._projectService.updateProject(this.project))
    .subscribe( () => {
      this._snackBar.open(this.project.title + " saved", "dismiss", {
        duration: 2000
      });
      this.goBack();
    })
  }

  goBack(): void {
    this._location.back();
  }
}
