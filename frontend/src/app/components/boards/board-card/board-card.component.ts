import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';
import { Board } from '../../../models/board';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {

  @Input() board: Board;
  // @Input() parentProjectId: string;

  @Output() deleted = new EventEmitter<string>();

  parentProject: Project;
  parentProjectLoaded: Promise<boolean>;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    // (await this.projectService.getProject(this.parentProjectId))
    (await this.projectService.getProject(this.board.currentProjectId))
    .subscribe((project: Project) => {
      this.parentProject = project;
      if (this.parentProject !== null) {
        this.parentProjectLoaded = Promise.resolve(true);
      }
    });
  }

  delete() {
    this.deleted.emit(this.board.id);
  }

}
