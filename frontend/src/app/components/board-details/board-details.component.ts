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

  @Input() board: Board;

  panelOpenState = false;

  tasks: Task[];

  currentItemId: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getBoard();
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');

    (await this.boardService.getBoard(id))
    .subscribe( async (data: Board) => {
      this.board = data;
      this.getTasks();
    });
  }

  async getTasks() {
    (await this.taskService.getTasks())
    .subscribe( (data: Task[]) => 
      this.tasks = data.filter((task: Task) => this.board.itemIds.includes(task.id)
    ));
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.boardService.updateBoard(this.board))
    .subscribe(() => {
      this._snackBar.open(this.board.title + " saved", "dismiss", {
        duration: 2000
      });
      this.goBack();
    });
  }

  async addTask(name: string) {
    (await this.taskService.createTask(name))
    .subscribe( async (data: Task) => {
      (await this.boardService.addTask(this.board, data.id))
      .subscribe( async () => {
        this.getTasks();
        this.board.itemIds.push(data.id);
        this._snackBar.open(name + " added", "dismiss", {
          duration: 2000
        });
      });
    });
  }

  async deleteBoard() {
    (await this.boardService.deleteBoard(this.board.id))
    .subscribe( () => {
      this.goBack();
      this._snackBar.open(this.board.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }

  async onDeleted(task: Task) {
    (await this.boardService.deleteTask(this.board, task.id))
    .subscribe( () => {
      this.getTasks();
      this.board.itemIds = this.board.itemIds.filter((item: string) => item !== task.id);
      this._snackBar.open(task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
    
    (await this.taskService.deleteTask(task.id))
    .subscribe( () => {
      this.tasks = this.tasks.filter((x: Task) => x.id !== task.id);
    });
  }

  async onCompleted(isCompleted: boolean) {
    console.log(isCompleted);
  }

  // async completeTask() {
  //   (await this.boardService.)
  // }
}
