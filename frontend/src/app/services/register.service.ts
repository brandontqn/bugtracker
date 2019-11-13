import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
    console.log( 'Hello from RegisterService!' );
  }

  protected currentEndpoint = AppConfigService.settings.projectManagementServiceEnv.iis.registration;

  async sendActivationEmail(email: string) {
    // const httpOptions = await this.getHeaders();
    return this.http.post(this.currentEndpoint, { value: email });
  }
}
