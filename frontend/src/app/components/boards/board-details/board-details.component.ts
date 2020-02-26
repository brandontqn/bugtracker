import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../services/project.service';
import { BoardService } from '../../../services/board.service';
import { TaskService } from '../../../services/task.service';
import { Project } from '../../../models/project';
import { Board } from '../../../models/board';
import { Task } from '../../../models/task';
import { AllProjectsComponent } from '../../projects/all-projects/all-projects.component';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  tasksTitle: string;
  board: Board;
  panelOpenState = false;
  tasks: Task[];
  availableProjects: Project[];
  selectedProject: string;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tasksTitle = 'Tasks';
    this.getBoard();
    this.availableProjects = AllProjectsComponent.allProjects;
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');

    (await this.boardService.getBoard(id))
    .subscribe( (data: Board) => {
      this.board = data;
      this.getTasks();
    });
  }

  async getTasks() {
    (await this.taskService.getTasks())
    .subscribe( (data: Task[]) =>
      this.tasks = data.filter((task: Task) => this.board.itemIds.includes(task.id))
    );
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.boardService.updateBoard(this.board))
    .subscribe( () => {
      this.snackBar.open(this.board.title + ' saved', 'dismiss', {
        duration: 2000
      });
      this.goBack();
    });
  }

  async deleteBoard() {
    (await this.boardService.deleteBoard(this.board.id))
    .subscribe( () => {
      this.goBack();
      this.snackBar.open(this.board.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onAdded(task: any) {
    (await this.taskService.createTask(task.title, task.description, task.time, task.boardId, task.tags))
    .subscribe( async (newTask: Task) => {
      this.board.itemIds.push(newTask.id);
      (await this.boardService.updateBoard(this.board))
      .subscribe(() => {
        this.getTasks();
        this.snackBar.open(task + ' added', 'dismiss', {
          duration: 2000
        });
      });
    });
  }

  async onDeleted(taskId: string) {
    this.board.itemIds = this.board.itemIds.filter((id: string) => id !== taskId);
    (await this.boardService.updateBoard(this.board))
    .subscribe(async () => {
      (await this.taskService.getTask(taskId))
      .subscribe(async (task: Task) => {
        task.currentBoardId = '';
        (await this.taskService.updateTask(task))
        .subscribe(() => {
          this.snackBar.open(task.title + ' deleted', 'dismiss', {
            duration: 2000
          });
        });
      });
    });
  }

  async onCompleted(task: Task) {
    (await this.taskService.updateTask(task))
    .subscribe(() => console.log(task.completed + ' 3'));
  }
}
