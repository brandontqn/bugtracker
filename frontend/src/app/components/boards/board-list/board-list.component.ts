import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Project } from '../../../models/project';
import { Board } from '../../../models/board';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  @Input() title: string;
  @Input() boards: Board[];
  @Input() allowBoardAdding: boolean;

  @Output() added = new EventEmitter();
  @Output() deleted = new EventEmitter<string>();

  selectedProject: string;
  availableProjects: Project[];
  availableProjectsLoaded: Promise<boolean>;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    (await this.projectService.getProjects())
    .subscribe((projects: Project[]) => {
      this.availableProjects = projects;
      this.availableProjectsLoaded = Promise.resolve(true);
    });
  }

  addBoard(title: string, description: string, currentProjectId: string) {
    this.added.emit({ title, description, currentProjectId });
  }

  deleteBoard(boardId: string) {
    this.deleted.emit(boardId);
  }
}
