import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { environment as development} from 'src/environments/environment.iis';
// import { environment as staging } from 'src/environments/environment.docker';
// import { environment as production} from 'src/environments/environment.k8s';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  static env;

  title = 'project-tracker';
  isAuthenticated: boolean;
  links = [
    {name: 'Dashboard', route: 'dashboard'},
    {name: 'Projects', route: 'projects'},
    {name: 'Boards', route: 'boards'},
    {name: 'Tasks', route: 'tasks'}
  ];
  activeLink = this.links[0];
  background = '';

  constructor(public oktaAuth: OktaAuthService) {
    AppComponent.env = development;
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  login() {
    this.oktaAuth.loginRedirect('/dashboard');
  }

  logout() {
    this.oktaAuth.logout('/');
  }

  toggleBackground() {
    this.background = this.background ? '' : 'primary';
  }
}
