import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task';
import { Time } from '../../../models/time';

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
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.title = 'All Tasks';
    this.getTasks();
  }

  async getTasks() {
    (await this.taskService.getTasks())
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
  }

  async onAdded(task: { title: string, description: string, time: Time, boardId: string, tags: string[] }) {
    (await this.taskService.createTask(task.title, task.description, task.time, task.boardId, task.tags))
    .subscribe( (item: Task) => {
      this.tasks.push(item);
      this.snackBar.open(task.title + ' added', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onDeleted(taskId: string) {
    (await this.taskService.deleteTask(taskId))
    .subscribe( () => {
      const deletedTask = this.tasks.filter((x: Task) => x.id === taskId)[0];
      this.tasks = this.tasks.filter((x: Task) => x.id !== taskId);
      this.snackBar.open(deletedTask.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onCompleted(task: Task) {
    (await this.taskService.updateTask(task))
    .subscribe(() => console.log(task.completed));
  }
}
