import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
    console.log( 'Hello from RegisterService!' );
  }

  protected currentEndpoint = AppConfigService.settings.projectManagementServiceEnv.iis.registration;

  sendActivationEmail(email: string) {
    // const httpOptions = await this.getHeaders();
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    const data = new Email(email);

    console.log("email: " + email);
    console.log("data.email: " + data.value);
    console.log("endpoint: " + this.currentEndpoint);
    console.log("httpOptions: " + httpOptions);

    return this.http.post<Email>(this.currentEndpoint, data, httpOptions);
  }
}

class Email {
  value: string;

  constructor(email: string) {
    this.value = email;
  }
}