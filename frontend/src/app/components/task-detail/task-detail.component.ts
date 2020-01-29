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

  panelOpenState = false;

  task: Task;
  progress: number;
  availableBoards: Board[];
  selectedBoard: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private boardService: BoardService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTask();
    this.availableBoards = AllBoardsComponent.allBoards;
  }

  TimeToSeconds(t: Time) {
    return (t.days * 24 * 60 * 60) +
           (t.hours * 60 * 60) +
           (t.minutes * 60) +
           t.seconds;
  }

  async getTask() {
    const id = this.route.snapshot.paramMap.get('id');
    (await this.taskService.getTask(id))
      .subscribe(data => {
        this.task = data;
        const logged = this.TimeToSeconds(this.task.timeLogged);
        const estimate = this.TimeToSeconds(this.task.timeEstimate);
        this.progress = (logged / estimate) * 100;
      });
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    if (this.task.currentBoardId == null) {
      (await this.boardService.addTask(this.selectedBoard, this.task.id))
      .subscribe(async () => {
        this.task.currentBoardId = this.selectedBoard;
        (await this.taskService.updateTask(this.task))
        .subscribe(() => {
          this.snackBar.open(this.task.title + ' saved', 'dismiss', {
            duration: 2000
          });
          this.goBack();
        });
      });
    } else {
      (await this.boardService.deleteTask(this.task.currentBoardId, this.task.id))
      .subscribe(async () => {
        (await this.boardService.addTask(this.selectedBoard, this.task.id))
        .subscribe(async () => {
          this.task.currentBoardId = this.selectedBoard;
          (await this.taskService.updateTask(this.task))
          .subscribe(() => {
            this.snackBar.open(this.task.title + ' saved', 'dismiss', {
              duration: 2000
            });
            this.goBack();
          });
        });
      });
    }
  }

  async add(days: number, hours: number, minutes: number, seconds: number) {
    const t = new Time(+days, +hours, +minutes, +seconds);
    this.task.timeLogged = Time.add(this.task.timeLogged, t);
    (await this.taskService.updateTask(this.task))
      .subscribe(() => {
        this.snackBar.open(this.task.title + ': time added.', 'dismiss', {
          duration: 2000
        });
        this.goBack();
      });
  }

  async deleteTask() {
    (await this.taskService.deleteTask(this.task.id))
    .subscribe( () => {
      this.goBack();
      this.snackBar.open(this.task.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }

  async completeTask() {
    this.task.completed = !this.task.completed;
    (await this.taskService.updateTask(this.task))
    .subscribe(() => console.log(this.task.completed));
  }
}
