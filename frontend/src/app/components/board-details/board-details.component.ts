import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  currentItemId: string;

  constructor(
    private _route: ActivatedRoute,
    private _boardService: BoardService,
    private _taskService: TaskService,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tasksTitle = "Tasks";
    this.getBoard();
  }

  async getBoard() {
    const id = this._route.snapshot.paramMap.get('id');

    (await this._boardService.getBoard(id))
    .subscribe( async (data: Board) => {
      this.board = data;
      this.getTasks();
    });
  }

  async getTasks() {
    (await this._taskService.getTasks())
    .subscribe( (data: Task[]) => 
      this.tasks = data.filter((task: Task) => this.board.itemIds.includes(task.id)
    ));
  }

  goBack(): void {
    this._location.back();
  }

  async save() {
    (await this._boardService.updateBoard(this.board))
    .subscribe(() => {
      this._snackBar.open(this.board.title + " saved", "dismiss", {
        duration: 2000
      });
      this.goBack();
    });
  }

  async deleteBoard() {
    (await this._boardService.deleteBoard(this.board.id))
    .subscribe( () => {
      this.goBack();
      this._snackBar.open(this.board.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }

  async onAdded(name: string) {
    (await this._taskService.createTask(name))
    .subscribe( async (data: Task) => {
      (await this._boardService.addTask(this.board.id, data.id))
      .subscribe( async () => {
        this.getTasks();
        this.board.itemIds.push(data.id);
        this._snackBar.open(name + " added", "dismiss", {
          duration: 2000
        });
      });
    });
  }

  async onDeleted(task: Task) {
    (await this._boardService.deleteTask(this.board.id, task.id))
    .subscribe( () => {
      this.getTasks();
      this.board.itemIds = this.board.itemIds.filter((item: string) => item !== task.id);
      this._snackBar.open(task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
    
    (await this._taskService.deleteTask(task.id))
    .subscribe( () => {
      this.tasks = this.tasks.filter((x: Task) => x.id !== task.id);
    });
  }

  async onCompleted(task: Task) {
    (await this._taskService.updateTask(task))
    .subscribe(() => console.log(task.completed + " 3"));
  }
}
