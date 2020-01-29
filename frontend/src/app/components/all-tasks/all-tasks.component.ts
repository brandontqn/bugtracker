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
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.title = 'All Tasks';
    this.getTasks();
  }

  async getTasks() {
    (await this.taskService.getTasks())
      .subscribe(data => this.tasks = data);
  }

  async onAdded(title: string) {
    (await this.taskService.createTask(title))
    .subscribe( (item: Task) => {
      this.tasks.push(item);
      this.snackBar.open(title + ' added', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onDeleted(task: Task) {
    (await this.taskService.deleteTask(task.id))
    .subscribe( () => {
      this.tasks = this.tasks.filter((x: Task) => x.id !== task.id);
      this.snackBar.open(task.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onCompleted(task: Task) {
    (await this.taskService.updateTask(task))
    .subscribe(() => console.log(task.completed));
  }
}
