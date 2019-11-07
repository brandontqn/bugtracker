import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'project-tracker';
  isAuthenticated: boolean;
  links = [
    {name: 'Dashboard', route: "dashboard"}, 
    {name: 'Boards', route: "boards"}, 
    {name: 'Tasks', route: "tasks"}
  ];
  activeLink = this.links[0];
  background = '';

  constructor(public oktaAuth: OktaAuthService) { 
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    )
  }

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
