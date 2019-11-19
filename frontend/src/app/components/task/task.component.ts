import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Output() deleted = new EventEmitter<Task>();
  @Output() completed = new EventEmitter<boolean>();
  
  isCompleted = false;

  delete() {
    this.deleted.emit(this.task);
  }

  complete() {
    this.isCompleted = !this.isCompleted;
    this.completed.emit(this.isCompleted);
  }

  constructor() { }

  ngOnInit() {
  }

}
