import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {
    console.log( 'Hello from RegisterService!' );
  }

  protected currentEndpoint = AppComponent.env.apiEndpoints.userManagementService + "/api/registration";

  sendActivationEmail(email: string) {
    const httpOptions = { 
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };

    return this.http.post<Email>(this.currentEndpoint, { value: email }, { headers: { 'Content-type': 'application/json' } });
  }

  validateToken(token: string) {
    const url = this.currentEndpoint + "/validate/" + token;
    return this.http.post(url, "", { headers: { 'Content-type': 'application/json' } });
  }

  createOktaAccountWithCredentials(firstName: string, lastName: string, email: string, login: string, password: string) {
    const url = this.currentEndpoint + "/create";
    var account = new Account(firstName, lastName, email, login, password);

    return this.http.post(url, account)
  }
}

class Email {
  value: string;

  constructor(email: string) {
    this.value = email;
  }
}

class Account {
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  password: string;

  constructor(fName: string, lName: string, email: string, login: string, pw: string) {
    this.firstName = fName;
    this.lastName = lName;
    this.email = email;
    this.login = login;
    this.password = pw;
  }
}