import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards: Board[];

  constructor( private boardService: BoardService ) { }

  ngOnInit() {
    this.getBoards();
  }

  async getBoards() {
    (await this.boardService.getBoards())
      .subscribe(data => this.boards = data)
  }

}
