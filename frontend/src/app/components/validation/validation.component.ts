import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  private validToken = false;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
  }

  async validate(token: string) {
    (await this.registerService.validateToken(token))
    .subscribe( (response: boolean) => this.validToken = response);
  }

}
