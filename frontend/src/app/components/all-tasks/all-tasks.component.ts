import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent implements OnInit {

  title: string;
  tasks: Task[];
  
  constructor( 
    private _taskService: TaskService, 
    private _snackBar: MatSnackBar 
  ) { }

  ngOnInit() {
    this.title = "All Tasks";
    this.getTasks();
  }

  async getTasks() {
    (await this._taskService.getTasks())
      .subscribe(data => this.tasks = data);
  }

  async onAdded(name: string) {
    (await this._taskService.createTask(name))
    .subscribe( (item: Task) => {
      this.tasks.push(item);
      this._snackBar.open(name + " added", "dismiss", {
        duration: 2000
      });
    });
  }

  async onDeleted(task: Task) {
    (await this._taskService.deleteTask(task.id))
    .subscribe( () => {
      this.tasks = this.tasks.filter((x: Task) => x.id !== task.id);
      this._snackBar.open(task.name + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }

  async onCompleted(task: Task) {
    (await this._taskService.updateTask(task))
    .subscribe(() => console.log(task.completed + " 3"));
  }
}
