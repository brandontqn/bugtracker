import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {

  @Input() project: Project;

  @Output() deleted = new EventEmitter<string>();

  delete() {
    this.deleted.emit(this.project.id);
  }
}
