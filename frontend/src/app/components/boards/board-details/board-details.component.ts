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
import { Time } from 'src/app/models/time';

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
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');
    (await this.boardService.getBoard(id))
    .subscribe(async (board: Board) => {
      this.board = board;
      this.getTasks();
    });
  }

  async getTasks() {
    (await this.taskService.getTasks())
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks.filter((task: Task) => this.board.itemIds.includes(task.id));
      this.getProjects();
    });
  }

  async getProjects() {
    (await this.projectService.getProjects())
    .subscribe((projects: Project[]) => {
      this.availableProjects = projects.filter((project: Project) => project.id !== this.board.currentProjectId);
    });
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    // remove board from current project
    (await this.projectService.getProject(this.board.currentProjectId))
    .subscribe(async (currentProject: Project) => {
      currentProject.boardIds = currentProject.boardIds.filter((id: string) => id !== this.board.id);
      (await this.projectService.updateProject(currentProject))
      .subscribe(async () => {
        // add board to new project
        this.selectedProject = this.selectedProject ? this.selectedProject : this.board.currentProjectId;
        (await this.projectService.getProject(this.selectedProject))
        .subscribe(async (newProject: Project) => {
          newProject.boardIds.push(this.board.id);
          (await this.projectService.updateProject(newProject))
          .subscribe(async () => {
            // update current board's parent project
            this.board.currentProjectId = this.selectedProject;
            (await this.boardService.updateBoard(this.board))
            .subscribe((data: Board) => {
              this.snackBar.open(this.board.title + ' saved', 'dismiss', {
                duration: 2000
              });
              this.goBack();
            });
          });
        });
      });
    });
  }

  async deleteBoard() {
    (await this.boardService.deleteBoard(this.board.id))
    .subscribe(() => {
      this.snackBar.open(this.board.title + ' deleted', 'dismiss', {
        duration: 2000
      });
      this.goBack();
    });
  }

  async onAdded(task: { title: string, description: string, time: Time, tags: string[] }) {
    (await this.taskService.createTask(task.title, task.description, task.time, this.board.id, task.tags))
    .subscribe( async (newTask: Task) => {
      (await this.boardService.updateBoard(this.board))
      .subscribe(async () => {
        (await this.taskService.getTasks())
        .subscribe( (tasks: Task[]) => {
          this.board.itemIds.push(newTask.id);
          // tslint:disable-next-line: no-shadowed-variable
          this.tasks = tasks.filter((task: Task) => this.board.itemIds.includes(task.id));
          this.snackBar.open(task + ' added', 'dismiss', {
            duration: 2000
          });
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
        (await this.taskService.updateTask(task))
        .subscribe(() => {
          task.currentBoardId = '';
          this.snackBar.open(task.title + ' deleted', 'dismiss', {
            duration: 2000
          });
        });
      });
    });
  }

  async onCompleted(task: Task) {
    await this.taskService.updateTask(task);
  }
}
