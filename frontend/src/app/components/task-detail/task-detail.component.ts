import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Time } from 'src/app/models/time';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  async getTask() {
    const id = this.route.snapshot.paramMap.get('id');
    (await this.taskService.getTask(id))
      .subscribe(data => this.task = data);
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.taskService.updateTask(this.task))
      .subscribe(() => {
        this._snackBar.open(this.task.name + " saved", "dismiss", {
          duration: 2000
        });
        this.goBack();
      });
  }

  async add(days: number, hours: number, minutes: number, seconds: number) {
    var t = new Time(+days, +hours, +minutes, +seconds);
    this.task.timeLogged = Time.add(this.task.timeLogged, t);
    (await this.taskService.updateTask(this.task))
      .subscribe(() => {
        this._snackBar.open(this.task.name + ": time added.", "dismiss", {
          duration: 2000
        });
        this.goBack();
      });
  }

  async deleteTask() {
    (await this.taskService.deleteTask(this.task.id))
    .subscribe( () => {
      this.goBack();
      this._snackBar.open(this.task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
