import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { Board } from 'src/app/models/board';
import { BoardService } from 'src/app/services/board.service';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];
  boards: Board[];
  projects: Project[];

  tiles: Tile[];

  constructor(private taskService: TaskService, private boardService: BoardService, private projectService: ProjectService) { }

  ngOnInit() {
    this.getTasks();
    this.getBoards();
    this.getProjects();

    this.tiles = [
      { id: 'label', cols: 1, rows: 3, text: 'Top Projects' },
      { id: 'projects', cols: 3, rows: 3, text: '' },
      { id: 'label', cols: 1, rows: 3, text: 'Top Boards' },
      { id: 'boards', cols: 3, rows: 3, text: '' },
      { id: 'label', cols: 1, rows: 3, text: 'Top Tasks' },
      { id: 'tasks', cols: 3, rows: 3, text: '' }
    ];
  }

  async getTasks() {
    (await this.taskService.getTasks())
    .subscribe(data => this.tasks = data.slice(0, 3));
  }

  async getBoards() {
    (await this.boardService.getBoards())
    .subscribe(data => this.boards = data.slice(0, 3));
  }

  async getProjects() {
    (await this.projectService.getProjects())
    .subscribe(data => this.projects = data.slice(0, 3));
  }
}

interface Tile {
  id: string;
  cols: number;
  rows: number;
  text: string;
}
