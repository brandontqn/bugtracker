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
import { environment } from 'src/environments/environment';

const config = {
  issuer: environment.development.okta.issuer,
  redirectUri: environment.development.okta.redirectUri,
  clientId: environment.development.okta.clientId,
  pkce: environment.development.okta.pkce
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
