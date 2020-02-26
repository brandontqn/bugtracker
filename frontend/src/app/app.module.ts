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
import { AllProjectsComponent } from './components/all-projects/all-projects.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { AllBoardsComponent } from './components/all-boards/all-boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskDetailsComponent } from './components/task-detail/task-detail.component';

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
