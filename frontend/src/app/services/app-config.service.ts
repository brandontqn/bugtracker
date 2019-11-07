import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { IAppConfig } from '../models/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  static settings: IAppConfig;

  constructor(private http: HttpClient) { }

  load() {
    const jsonFile = '../assets/config/config.dev.json';

    return new Promise<void> ( (resolve, reject) => {
      this.http.get(jsonFile).toPromise().then( (response: IAppConfig) => {
        AppConfigService.settings = <IAppConfig>response;
        resolve();
      }).catch( (response: any) => {
        reject(`Could not load the file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }

}
