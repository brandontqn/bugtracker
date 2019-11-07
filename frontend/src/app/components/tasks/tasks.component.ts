import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  
  constructor( private taskService: TaskService ) { }

  ngOnInit() {
    this.getTasks();
  }

  async getTasks() {
    (await this.taskService.getTasks())
      .subscribe(data => this.tasks = data)
  }

  async deleteTask(id: string) {
    (await this.taskService.deleteTask(id))
      .subscribe( () =>
        this.tasks = this.tasks.filter( (task: Task) => task.id !== id )
      )
  }

}
