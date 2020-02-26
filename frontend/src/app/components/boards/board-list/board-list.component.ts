import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Board } from '../../../models/board';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent {

  @Input() title: string;
  @Input() boards: Board[];

  @Output() added = new EventEmitter();
  @Output() deleted = new EventEmitter<string>();

  addBoard(title: string, description: string, currentProjectId: string) {
    this.added.emit({ title, description, currentProjectId });
  }

  deleteBoard(boardId: string) {
    this.deleted.emit(boardId);
  }
}
