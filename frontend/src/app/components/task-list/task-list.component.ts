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
  @Output() completed = new EventEmitter<boolean>();

  addTask(name: string) {
    this.added.emit(name);
  }

  onDeleted(task: Task) {
    this.deleted.emit(task);
  }

  onCompleted(isCompleted: boolean) {
    this.completed.emit(isCompleted);
    console.log(isCompleted + " 2");
  }

}
