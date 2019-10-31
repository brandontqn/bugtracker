import { Component, OnInit } from '@angular/core';
// import { Task } from '../models/task';
import { TASKS } from '../models/mock-tasks';

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

  tasks = TASKS;

  constructor() { }

  ngOnInit() {
  }

}
