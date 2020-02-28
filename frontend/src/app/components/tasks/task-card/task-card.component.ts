import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { Board } from 'src/app/models/board';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task: Task;

  @Output() deleted = new EventEmitter<string>();
  @Output() completed = new EventEmitter<Task>();

  parentBoard: Board;
  parentBoardLoaded: Promise<boolean>;

  constructor(private boardService: BoardService) { }

  async ngOnInit() {
    (await this.boardService.getBoard(this.task.currentBoardId))
    .subscribe((board: Board) => {
      this.parentBoard = board;
      this.parentBoardLoaded = Promise.resolve(true);
    });
  }

  delete() {
    this.deleted.emit(this.task.id);
  }

  complete() {
    this.task.completed = !this.task.completed;
    this.completed.emit(this.task);
  }
}
