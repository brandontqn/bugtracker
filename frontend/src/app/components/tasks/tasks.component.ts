import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
// import { TASKS } from '../../models/mock-tasks';
import { Task } from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  selectedTask: Task;

  // onSelect(task: Task): void {
  //   this.selectedTask = task;
  // }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(data => this.tasks = data)
  }

  constructor( private taskService: TaskService ) { }

  ngOnInit() {
    this.getTasks();
  }

}
