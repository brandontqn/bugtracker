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
    private _route: ActivatedRoute,
    private _registerService: RegisterService, 
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.validateToken();
  }

  async validate(token: string) {
    this._registerService.validateToken(token)
    .subscribe( (response: boolean) => {
      this.validToken = response;
      if (this.validToken) {
        this._snackBar.open("Token has been validated!", "dismiss", { duration: 2000 });
      }
      else {
        this._snackBar.open("Token is not valid.", "dismiss", { duration: 2000 })
      }
    });
  }

  async validateToken() {
    const token = this._route.snapshot.paramMap.get('token');

    (await this._registerService.validateToken(token))
    .subscribe( (response: {email: string, validated: boolean}) => { 
      this.email = response.email;
      this.validToken = response.validated;
      if (this.validToken) {
        this._snackBar.open("Token has been validated!", "dismiss", { duration: 2000 });
      }
      else {
        this._snackBar.open("Token is not valid.", "dismiss", { duration: 2000 })
      }
    });
  }

  async createAccount(firstName: string, lastName: string, password: string) {
    // var fn = (<HTMLInputElement>document.getElementById(firstName)).value;
    // var ln = (<HTMLInputElement>document.getElementById(lastName)).value;
    // var pw = (<HTMLInputElement>document.getElementById(password)).value;

    // (await this._registerService.createOktaAccountWithCredentials(fn, ln, this.email, this.email, pw))
    (await this._registerService.createOktaAccountWithCredentials(firstName, lastName, this.email, this.email, password))
    .subscribe( () => {
      this.validToken = false;
      this._snackBar.open("Account created! You can now log into your account.", "dismiss", { duration: 2000 })
    });
  }

}
