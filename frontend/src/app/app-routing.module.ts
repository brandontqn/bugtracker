import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent as TaskDetailsComponent } from './components/task-detail/task-detail.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationComponent } from './components/validation/validation.component';
import { AppConfigService } from './services/app-config.service';

const config = {
  issuer: "https://dev-662146.okta.com/oauth2/default",//AppConfigService.settings.development.okta.issuer,
  redirectUri: "http://localhost:4200/implicit/callback",//AppConfigService.settings.development.okta.redirectUri,
  clientId: "0oa1pj0whzk15BvVH357",//AppConfigService.settings.development.okta.clientId,
  pkce: true//AppConfigService.settings.development.okta.pkce
};

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'validate', component: ValidationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/detail/:id', component: TaskDetailsComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/detail/:id', component: BoardDetailsComponent },
  { path: 'boards/detail/:bid/tasks/detail/:tid', redirectTo: 'tasks/detail/:tid', pathMatch: 'full' },
  { path: 'dashboard/tasks/detail/:tid', redirectTo: 'tasks/detail/:tid', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule.initAuth(config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
