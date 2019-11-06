import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskDetailsComponent as TaskDetailsComponent } from './components/task-detail/task-detail.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';

const config = {
  issuer: 'https://dev-662146.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa1pj0whzk15BvVH357',
  pkce: true
}

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: LandingPageComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/detail/:id', component: TaskDetailsComponent },
  { path: 'boards', component: BoardsComponent },
  { path: 'boards/detail/:id', component: BoardDetailsComponent },
  { path: 'boards/detail/:bid/tasks/detail/:tid', redirectTo: 'tasks/detail/:tid', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule.initAuth(config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
