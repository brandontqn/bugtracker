import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {

  @Input() title: string;
  @Input() boards: Board[];

  @Output() added = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<Board>();

  addBoard(title: string) {
    this.added.emit(title);
  }

  deleteBoard(board: Board) {
    this.deleted.emit(board);
  }
}
