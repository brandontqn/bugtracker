import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {

  @Input() title: string;
  @Input() projects: Project[];

  @Output() added = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<Project>();


  addProject(title: string) {
    this.added.emit(title);
  }

  deleteProject(project: Project) {
    this.deleted.emit(project);
  }
}
