import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/app-config.service';

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
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent } from './components/task-detail/task-detail.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { RegisterComponent } from './components/register/register.component';

export function intializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailsComponent,
    NavMenuComponent,
    DashboardComponent,
    LandingPageComponent,
    BoardsComponent,
    BoardDetailsComponent,
    RegisterComponent
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
    AppConfigService, { provide: APP_INITIALIZER, useFactory: intializeApp, deps: [AppConfigService], multi: true },
    TaskService,
    BoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
