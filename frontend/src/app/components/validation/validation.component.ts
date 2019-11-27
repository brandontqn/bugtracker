import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

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

  async createAccount(firstName: string, lastName: string, email: string, password: string) {
    (await this._registerService.createOktaAccountWithCredentials(firstName, lastName, email, email, password))
    .subscribe( () => {
      this.validToken = false;
      this._snackBar.open("Account created! You can now log into your account.", "dismiss", { duration: 2000 })
    });
  }

}

// class asdf {
//   email: string;
//   validated: boolean;   
// }


// (response: asdf) => {
//   console.log('response', response);
//   // this.email = response.email;
//   // console.log("this.email: " + this.email + ", response.email: " + response.email);
//   // this.validToken = response.validated;
//   // console.log("this.validToken: " + this.validToken + ", response.validated: " + response.validated);
//   if (this.validToken) {
//     this._snackBar.open("Token has been validated!", "dismiss", { duration: 2000 });
//   }
//   else {
//     this._snackBar.open("Token is not valid.", "dismiss", { duration: 2000 })
//   }
// }

// async validateToken() {
//   const token = this._route.snapshot.paramMap.get('token');

//   this._registerService.validateToken(token)
//   .subscribe(
//     {
//       next(rest) { console.log('res: ', rest); },
//       error(msg) { console.log('Error Getting res: ', msg); }
//     }
//   );
// }