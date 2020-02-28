import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardService } from '../../../services/board.service';
import { TaskService } from '../../../services/task.service';
import { AllBoardsComponent } from '../../boards/all-boards/all-boards.component';
import { Board } from '../../../models/board';
import { Task } from '../../../models/task';
import { Time } from '../../../models/time';

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
  doneButtonText: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private boardService: BoardService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.getTask();
    (await this.boardService.getBoards())
    .subscribe((boards: Board[]) => {
      this.availableBoards = boards;
    });
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
        this.doneButtonText = this.task.completed ? 'MARK DONE' : 'MARK UNDONE';
      });
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.boardService.getBoard(this.selectedBoard))
    .subscribe(async (board: Board) => {
      board.itemIds.push(this.task.id);
      (await this.boardService.updateBoard(board));
    });

    this.task.currentBoardId = this.selectedBoard;
    (await this.taskService.updateTask(this.task));

    this.snackBar.open(this.task.title + ' saved', 'dismiss', {
      duration: 2000
    });
    this.goBack();
  }

  async logTime(days: number, hours: number, minutes: number, seconds: number) {
    const time = new Time(+days, +hours, +minutes, +seconds);
    this.task.timeLogged = Time.add(this.task.timeLogged, time);
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
    .subscribe(() => {
      this.snackBar.open(this.task.title + ' deleted', 'dismiss', {
        duration: 2000
      });
      this.goBack();
    });
  }

  async completeTask() {
    this.task.completed = !this.task.completed;
    this.doneButtonText = this.task.completed ? 'MARK DONE' : 'MARK UNDONE';
    const doneMessage = this.task.completed ? 'marked undone' : 'marked done';
    (await this.taskService.updateTask(this.task))
    .subscribe(() => {
      this.snackBar.open(this.task.title + ' ' + doneMessage, 'dismiss', {
        duration: 2000
      });
    });
  }
}
