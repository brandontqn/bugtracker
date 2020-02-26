import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task: Task;

  @Output() deleted = new EventEmitter<string>();
  @Output() completed = new EventEmitter<Task>();

  delete() {
    this.deleted.emit(this.task.id);
  }

  complete() {
    this.task.completed = !this.task.completed;
    this.completed.emit(this.task);
  }
}
