import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../services/project.service';
import { BoardService } from '../../../services/board.service';
import { Project } from '../../../models/project';
import { Board } from '../../../models/board';

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
    .subscribe((project: Project) => {
      this.project = project;
      this.getBoards();
    });
  }

  async getBoards() {
    (await this.boardService.getBoards())
    .subscribe((boards: Board[]) => {
      this.boards = boards.filter((board: Board) => this.project.boardIds.includes(board.id));
    });
  }

  async onAdded(board: { title: string, description: string, currentProjectId: string }) {
    console.log('this.project: ', this.project);
    console.log('board: ', board);
    (await this.boardService.createBoard(board.title, board.description, this.project.id))
    .subscribe(async (newBoard: Board) => {
      console.log('newBoard: ', newBoard);
      this.project.boardIds.push(newBoard.id);
      console.log('newProject: ', this.project);
      (await this.projectService.updateProject(this.project))
      .subscribe(() => {
        this.snackBar.open(board + ' added', 'dismiss', {
          duration: 2000
        });
      });
    });
  }

  async onDeleted(boardId: string) {
    (await this.boardService.deleteBoard(boardId))
    .subscribe(async () => {
      const deletedBoard = this.boards.filter((x: Board) => x.id === boardId)[0];
      this.project.boardIds = this.project.boardIds.filter((id: string) => id !== boardId);
      (await this.projectService.updateProject(this.project))
      .subscribe((updatedProject: Project) => {
        this.snackBar.open(deletedBoard.title + ' deleted', 'dismiss', {
          duration: 2000
        });
      });
    });
  }

  async save() {
    (await this.projectService.updateProject(this.project))
    .subscribe(() => {
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
