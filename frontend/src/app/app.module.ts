import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgMaterialModule } from './material-module';

import { TaskService } from './services/task.service';
import { BoardService } from './services/board.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './components/task-detail/task-detail.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AllBoardsComponent } from './components/all-boards/all-boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './services/register.service';
import { ValidationComponent } from './components/validation/validation.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTasksComponent,
    TaskDetailsComponent,
    NavMenuComponent,
    DashboardComponent,
    LandingPageComponent,
    AllBoardsComponent,
    BoardDetailsComponent,
    RegisterComponent,
    ValidationComponent,
    TaskCardComponent,
    TaskListComponent,
    BoardCardComponent,
    BoardListComponent,
    ProjectListComponent
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
    TaskService,
    BoardService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
