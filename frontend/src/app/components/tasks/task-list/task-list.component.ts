import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { Board } from '../../../models/board';
import { Task } from '../../../models/task';
import { Time } from '../../../models/time';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() title: string;
  @Input() tasks: Task[];
  @Input() allowTaskAdding: boolean;

  @Output() added = new EventEmitter();
  @Output() deleted = new EventEmitter<string>();
  @Output() completed = new EventEmitter<Task>();

  selectedBoard: string;
  availableBoards: Board[];
  availableBoardsLoaded: Promise<boolean>;

  constructor(private boardService: BoardService) { }

  async ngOnInit() {
    (await this.boardService.getBoards())
    .subscribe((boards: Board[]) => {
      this.availableBoards = boards;
      this.availableBoardsLoaded = Promise.resolve(true);
    });
  }

  addTask(title: string, description: string, days: string, currentBoardId: string, tags: string[]) {
    const time = new Time(+days, 0, 0, 0);
    this.added.emit({ title, description, time, currentBoardId, tags });
  }

  onDeleted(taskId: string) {
    this.deleted.emit(taskId);
  }

  onCompleted(task: Task) {
    this.completed.emit(task);
  }
}
