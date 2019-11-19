import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Board } from 'src/app/models/board';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent {

  @Input() board: Board;

  @Output() deleted = new EventEmitter<Board>();

  delete() {
    this.deleted.emit(this.board);
  }

}
