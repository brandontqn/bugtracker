import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { TaskDetailsComponent } from './components/task-detail/task-detail.component';
import { AllBoardsComponent } from './components/all-boards/all-boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationComponent } from './components/validation/validation.component';
import { environment } from 'src/environments/environment';

const config = {
  issuer: environment.okta.issuer,
  redirectUri: environment.okta.redirectUri,
  clientId: environment.okta.clientId,
  pkce: environment.okta.pkce
};

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'validate/:token', component: ValidationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: AllTasksComponent },
  { path: 'tasks/detail/:id', component: TaskDetailsComponent },
  { path: 'boards', component: AllBoardsComponent },
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
