import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() title: string;
  @Input() tasks: Task[];

  @Output() added = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<Task>();
  @Output() completed = new EventEmitter<Task>();

  addTask(title: string) {
    this.added.emit(title);
  }

  onDeleted(task: Task) {
    this.deleted.emit(task);
  }

  onCompleted(task: Task) {
    this.completed.emit(task);
  }

}
