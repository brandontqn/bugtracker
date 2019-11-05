import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { OktaCallbackComponent, OktaAuthModule } from '@okta/okta-angular';

const config = {
  issuer: 'https://dev-662146.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa1pj0whzk15BvVH357',
  pkce: true
}

const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: '', component: LandingPageComponent },
  { path: 'implicit/callback', component: OktaCallbackComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'detail/:name', component: TaskDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule.initAuth(config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
