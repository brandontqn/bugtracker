import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  isCompleted = false;
  
  @Input() task: Task;

  @Output() deleted = new EventEmitter<Task>();
  @Output() completed = new EventEmitter<boolean>();
  
  delete() {
    this.deleted.emit(this.task);
  }

  complete() {
    this.isCompleted = !this.isCompleted;
    this.completed.emit(this.isCompleted);
    console.log(this.isCompleted + " 1");
  }

}
