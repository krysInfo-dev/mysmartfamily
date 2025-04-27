import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FilesUploaderService {

  private uploadUrl = '/api/documents';

  readonly #http = inject(HttpClient);

  uploadFile(isProduction: boolean, prodBaseUrl: string, file: File): Observable<HttpEvent<any>> {
    const url = isProduction ? prodBaseUrl + this.uploadUrl : this.uploadUrl;
    const formData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.#http.request(req);
  }

}
