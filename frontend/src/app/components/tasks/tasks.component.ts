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

  // task = 'fix bug 1';

  // task: Task = {
  //   id: 1,
  //   name: 'Bug 1',
  //   details: 'there is an insect problem'
  // }

  // tasks = TASKS;
  // tasks: Task[];
  tasks = [];

  selectedTask: Task;

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  constructor( private taskService: TaskService ) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(data => this.tasks = data);
  }

}
