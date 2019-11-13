import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // private validateButtonVisible = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  async register(email: string){
    // this.validateButtonVisible = true;

    (await this.registerService.sendActivationEmail(email))
    .subscribe();
  }

}
