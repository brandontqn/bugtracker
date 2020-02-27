import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task';
import { Time } from '../../../models/time';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() title: string;
  @Input() tasks: Task[];

  @Output() added = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<string>();
  @Output() completed = new EventEmitter<Task>();

  addTask(title: string, description: string, time: Time, tags: string[]) {
    this.added.emit({ title, description, time, tags });
  }

  onDeleted(taskId: string) {
    this.deleted.emit(taskId);
  }

  onCompleted(task: Task) {
    this.completed.emit(task);
  }
}
