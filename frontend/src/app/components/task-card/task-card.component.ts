import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  // isCompleted = false;
  
  @Input() task: Task;

  @Output() deleted = new EventEmitter<Task>();
  @Output() completed = new EventEmitter<Task>();
  
  delete() {
    this.deleted.emit(this.task);
  }

  complete() {
    this.task.completed = !this.task.completed;
    this.completed.emit(this.task);
    console.log(this.task.completed + " 1");
  }

}
