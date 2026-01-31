import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMePayload } from '../interfaces/contact.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly _sendEmailUrl = 'https://caporrimo-portfolio-email-fkcyb4b0dmccb6br.westus3-01.azurewebsites.net/api/sendEmail?code=YEvDM2l9gIcrCaYjtPSPknTyI-s5jfUVyrVM11FSIqRuAzFupeYZgA==';

  constructor(private _http: HttpClient) { }

  public sendEmail(payload: ContactMePayload) {
    return this._http.post(this._sendEmailUrl, payload);
  }
}
