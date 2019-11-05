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
import { MatNativeDateModule } from '@angular/material/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

// const config = {
//   issuer: 'https://dev-662146.okta.com/oauth2/default',
//   redirectUri: 'http://localhost:4200/implicit/callback',
//   clientId: '0oa1pj0whzk15BvVH357',
//   pkce: true
// }

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
    MatNativeDateModule,
    
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
