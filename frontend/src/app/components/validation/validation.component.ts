import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  validToken = false;
  email: string;

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.validateToken();
  }

  async validate(token: string) {
    this.registerService.validateToken(token)
    .subscribe( (response: boolean) => {
      this.validToken = response;
      if (this.validToken) {
        this.snackBar.open('Token has been validated!', 'dismiss', { duration: 2000 });
      } else {
        this.snackBar.open('Token is not valid.', 'dismiss', { duration: 2000 });
      }
    });
  }

  async validateToken() {
    const token = this.route.snapshot.paramMap.get('token');

    (await this.registerService.validateToken(token))
    .subscribe( (response: {email: string, validated: boolean}) => {
      this.email = response.email;
      this.validToken = response.validated;
      if (this.validToken) {
        this.snackBar.open('Token has been validated!', 'dismiss', { duration: 2000 });
      } else {
        this.snackBar.open('Token is not valid.', 'dismiss', { duration: 2000 });
      }
    });
  }

  async createAccount(firstName: string, lastName: string, password: string) {
    (await this.registerService.createOktaAccountWithCredentials(firstName, lastName, this.email, this.email, password))
    .subscribe( () => {
      this.validToken = false;
      this.snackBar.open('Account created! You can now log into your account.', 'dismiss', { duration: 2000 });
    });
  }

}
