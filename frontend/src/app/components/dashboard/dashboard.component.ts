import { Component, OnInit } from '@angular/core';
import { Task, ITask } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    (await this.taskService.getTasks())
      .subscribe(data => this.tasks = data.slice(0, 3))
  }
}
