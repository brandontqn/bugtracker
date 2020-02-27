import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  title: string;
  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.title = 'All Projects';
    this.getProjects();
  }

  async getProjects() {
    (await this.projectService.getProjects())
    .subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  async onAdded(project: { title: string, description: string }) {
    (await this.projectService.createProject(project.title, project.description))
    .subscribe( (data: Project) => {
      this.projects.push(data);
      this.snackBar.open(project.title + ' added', 'dismiss', {
        duration: 2000
      });
    });
  }

  async onDeleted(projectId: string) {
    (await this.projectService.deleteProject(projectId))
    .subscribe(() => {
      const deletedProject = this.projects.filter((x: Project) => x.id === projectId)[0];
      this.projects = this.projects.filter((x: Project) => x.id !== projectId);
      this.snackBar.open(deletedProject.title + ' deleted', 'dismiss', {
        duration: 2000
      });
    });
  }
}
