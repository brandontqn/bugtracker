import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  @Input() title: string;
  @Input() projects: Project[];

  @Output() added = new EventEmitter();
  @Output() deleted = new EventEmitter<string>();


  addProject(title: string, description: string) {
    this.added.emit({ title, description });
  }

  deleteProject(projectId: string) {
    this.deleted.emit(projectId);
  }
}
