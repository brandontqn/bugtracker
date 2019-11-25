import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];
  boards: Board[];

  constructor(private _taskService: TaskService, private _boardService: BoardService) { }

  ngOnInit() {
    this.getTasks();
    this.getBoards();
  }

  async getTasks() {
    (await this._taskService.getTasks())
    .subscribe(data => this.tasks = data.slice(0, 3));
  }

  async getBoards() {
    (await this._boardService.getBoards())
    .subscribe(data => this.boards = data.slice(0, 3));
  }
}
