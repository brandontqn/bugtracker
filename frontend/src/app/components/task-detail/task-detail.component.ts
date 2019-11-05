import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  async getTask() {
    const name = this.route.snapshot.paramMap.get('name');
    (await this.taskService.getTask(name))
      .subscribe(data => this.task = data);
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.taskService.updateTask(this.task))
      .subscribe(() => this.goBack());
  }

}
