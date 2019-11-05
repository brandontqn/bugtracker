import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';

import { TaskService } from './services/task.service';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailComponent,
    NavMenuComponent,
    DashboardComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatSliderModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
