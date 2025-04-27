import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

const BASE_URL = '/api/emails/transactional';

@Injectable({ providedIn: 'root' })
export class EmailsService {

  readonly #http = inject(HttpClient);

  private getBaseURL(): string {
    return environment.production ? environment.apiBaseUrl + BASE_URL : BASE_URL;
  }

  sendTransactionalEmail(data: FormData) {
    return this.#http.post(this.getBaseURL(), data);
  }

}
