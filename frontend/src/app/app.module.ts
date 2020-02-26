import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgMaterialModule } from './material-module';

import { RegisterService } from './services/register.service';
import { TaskService } from './services/task.service';
import { BoardService } from './services/board.service';
import { ProjectService } from './services/project.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationComponent } from './components/validation/validation.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllProjectsComponent } from './components/projects/all-projects/all-projects.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectCardComponent } from './components/projects/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { AllBoardsComponent } from './components/boards/all-boards/all-boards.component';
import { BoardDetailsComponent } from './components/boards/board-details/board-details.component';
import { BoardListComponent } from './components/boards/board-list/board-list.component';
import { BoardCardComponent } from './components/boards/board-card/board-card.component';
import { AllTasksComponent } from './components/tasks/all-tasks/all-tasks.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskCardComponent } from './components/tasks/task-card/task-card.component';
import { TaskDetailsComponent } from './components/tasks/task-detail/task-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ValidationComponent,
    NavMenuComponent,
    LandingPageComponent,
    DashboardComponent,
    AllProjectsComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    AllBoardsComponent,
    BoardListComponent,
    BoardCardComponent,
    BoardDetailsComponent,
    AllTasksComponent,
    TaskListComponent,
    TaskCardComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgMaterialModule
  ],
  providers: [
    RegisterService,
    ProjectService,
    BoardService,
    TaskService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
