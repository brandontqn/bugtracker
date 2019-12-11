import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  public static projects: Project[];
  title: string;
  projects: Project[];

  constructor( private _projectService: ProjectService, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.title = "All Projects";
    this.getProjects();
  }

  async getProjects() {
    (await this._projectService.getProjects())
    .subscribe(data => {
      this.projects = data;
      AllProjectsComponent.projects = this.projects;
    });
  }

  async onAdded(title: string) {
    (await this._projectService.addProject(title))
    .subscribe( (data: Project) => {
      this.projects.push(data);
      AllProjectsComponent.projects.push(data);
      this._snackBar.open(title + " added", "dismiss", {
        duration: 2000
      });
    });
  }

  async onDeleted(project: Project) {
    (await this._projectService.deleteProject(project.id))
    .subscribe( () => {
      this.projects = this.projects.filter( (x: Project) => x.id !== project.id );
      AllProjectsComponent.projects = AllProjectsComponent.projects.filter( (x: Project) => x.id !== project.id);
      this._snackBar.open(project.title + " deleted", "dismiss", {
        duration: 2000
      });
    });
  }
}
