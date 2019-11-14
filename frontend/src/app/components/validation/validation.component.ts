import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  private validToken = false;

  constructor(private registerService: RegisterService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async validate(token: string) {
    (await this.registerService.validateToken(token))
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

  async createAccount(firstName: string, lastName: string, email: string, password: string) {
    (await this.registerService.createOktaAccountWithCredentials(firstName, lastName, email, email, password))
    .subscribe( () => {
      this.validToken = false;
      this._snackBar.open("Account created! You can now log into your account.", "dismiss", { duration: 2000 })
    });
  }

}
