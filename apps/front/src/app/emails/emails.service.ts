import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const BASE_URL = '/api/emails/transactional';

@Injectable({ providedIn: 'root' })
export class EmailsService {

  readonly #http = inject(HttpClient);

  sendTransactionalEmail(data: FormData) {
    const url = `${BASE_URL}`;
    return this.#http.post(url, data);
  }

}
