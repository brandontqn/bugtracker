import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  async register(email: string) {
    (await this.registerService.sendActivationEmail(email))
    .subscribe( () => this._snackBar.open("Email verification link sent to : " + email, "dismiss", { duration: 2000 }) );
  }

}
