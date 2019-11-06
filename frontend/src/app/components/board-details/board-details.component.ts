import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {

  @Input() board: Board;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getBoard();
  }

  async getBoard() {
    const id = this.route.snapshot.paramMap.get('id');
    (await this.boardService.getBoard(id))
      .subscribe(data => this.board = data)
  }

  goBack(): void {
    this.location.back();
  }

  async save() {
    (await this.boardService.updateBoard(this.board))
      .subscribe(() => this.goBack());
  }

}
