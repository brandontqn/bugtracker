import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Time } from 'src/app/models/time';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Board } from 'src/app/models/board';
import { AllBoardsComponent } from '../all-boards/all-boards.component';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  task: Task;
  progress: number;
  availableBoards: Board[];
  
  selectedBoard: string;

  constructor(
    private _route: ActivatedRoute,
    private _taskService: TaskService,
    private _boardService: BoardService,
    private _location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTask();
    this.availableBoards = AllBoardsComponent.boards;
  }

  TimeToSeconds(t: Time) {
    return (t.days * 24 * 60 * 60) +
           (t.hours * 60 * 60) +
           (t.minutes * 60) +
           t.seconds;
  }

  async getTask() {
    const id = this._route.snapshot.paramMap.get('id');
    (await this._taskService.getTask(id))
      .subscribe(data => {
        this.task = data;
        var logged = this.TimeToSeconds(this.task.timeLogged);
        var estimate = this.TimeToSeconds(this.task.timeEstimate);
        this.progress = (logged/estimate) * 100;
      });
  }

  goBack(): void {
    this._location.back();
  }

  async save() {
    // delete task from current board
    console.log("currentBoardId: " + this.task.currentBoardId);
    // console.log(this.task.id);
    if (this.task.currentBoardId !== null) {
      (await this._boardService.deleteTask(this.task.currentBoardId, this.task.id))
      .subscribe(async () => {
        console.log("task deleted from current board");
        // add task to new board
        (await this._boardService.addTask(this.selectedBoard, this.task.id))
        .subscribe(async () => {
          console.log("task added to new board");
          (await this._taskService.updateTask(this.task))
          .subscribe(() => {
            console.log("task updated");
            this._snackBar.open(this.task.name + " saved", "dismiss", {
              duration: 2000
            });
            this.goBack();
          });
        });
      });
    }

    else {
      // add task to new board
      (await this._boardService.addTask(this.selectedBoard, this.task.id))
      .subscribe(async () => {
        console.log("task added to new board");
        this.task.currentBoardId = this.selectedBoard;
        (await this._taskService.updateTask(this.task))
        .subscribe(() => {
          console.log("task updated");
          this._snackBar.open(this.task.name + " saved", "dismiss", {
            duration: 2000
          });
          this.goBack();
        });
      });
    }
  }

  async add(days: number, hours: number, minutes: number, seconds: number) {
    var t = new Time(+days, +hours, +minutes, +seconds);
    this.task.timeLogged = Time.add(this.task.timeLogged, t);
    (await this._taskService.updateTask(this.task))
      .subscribe(() => {
        this._snackBar.open(this.task.name + ": time added.", "dismiss", {
          duration: 2000
        });
        this.goBack();
      });
  }

  async deleteTask() {
    (await this._taskService.deleteTask(this.task.id))
    .subscribe( () => {
      this.goBack();
      this._snackBar.open(this.task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
