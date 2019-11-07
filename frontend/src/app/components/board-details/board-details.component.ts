import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import { TasksComponent } from '../tasks/tasks.component';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  @Input() board: Board;

  panelOpenState = false;

  tasks: Task[];

  currentItemId: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getBoard();
    this.getTasks();
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');

    (await this.boardService.getBoard(id))
      .subscribe( async (data: Board) => {
        this.board = data;
        });
  }

  async getTasks() {
    (await this.taskService.getTasks())
    .subscribe( (data: Task[]) => 
      this.tasks = data.filter( task =>
        this.board.itemIds.includes(task.id)
      ));
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.boardService.updateBoard(this.board))
      .subscribe(() => this.goBack());
  }

  async addTask(name: string) {
    (await this.taskService.createTask(name))
      .subscribe( async (data: Task) => {
        (await this.boardService.addTask(this.board, data.id))
          .subscribe( async () => {
            (await this.getTasks())
            this.board.itemIds.push(data.id);
          });
      });
  }

  async deleteTask(id: string) {
    (await this.boardService.deleteTask(this.board, id))
      .subscribe( async () => {
          (await this.getTasks())
          this.board.itemIds = this.board.itemIds.filter(item => item != id)
        }
      );
  }
}
