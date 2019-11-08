import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  
  constructor( private taskService: TaskService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    (await this.taskService.getTasks())
      .subscribe(data => this.tasks = data);
  }

  async addTask(name: string) {
    (await this.taskService.createTask(name))
    .subscribe( (item: Task) => {
      this.tasks.push(item);
      this._snackBar.open(name + " added", "dismiss", {
        duration: 2000
      });
    });
  }

  async deleteTask(task: Task) {
    (await this.taskService.deleteTask(task.id))
    .subscribe( () => {
      this.tasks = this.tasks.filter((x: Task) => x.id !== task.id);
      this._snackBar.open(task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
