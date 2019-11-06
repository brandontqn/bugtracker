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

  tasks: Task[];

  currentItemId: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private taskService: TaskService,
    private location: Location,
  ) { }

  async ngOnInit() {
    await this.getBoard();
    await this.getTasks();
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');
    (await this.boardService.getBoard(id))
      .subscribe(data => this.board = data)
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
      .subscribe(() => this.location.go);
  }

  async add(name: string) {
    const observable = await this.taskService.createTask(name);

    observable.subscribe( (data: Task) => {
        console.log('currTaskId: ', data.id);
        this.board.itemIds.push(data.id);
        
        console.log(this.board);

        this.boardService.addTask(this.board, data.id);
      }
    );
  }
}
