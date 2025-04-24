import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFindTest, ITest } from '@mysmartfamily/shared-models';
import { environment } from '../../environments/environment'

const BASE_URL = '/api/datas/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly #http = inject(HttpClient);

  private getBaseURL(): string {
    return environment.production ? environment.apiBaseUrl + '/' + BASE_URL : BASE_URL;
  }
  createTest(test: ITest): Observable<void> {
    return this.#http.post<void>(this.getBaseURL(), test);
  }

  readAllTest(): Observable<ITest[]> {
    return this.#http.get<ITest[]>(`${this.getBaseURL()}/all`);
  }

  readTests(filter: string, pageNumber: number, pageSize: number): Observable<IFindTest> {
    const url = `${this.getBaseURL()}?filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const result = this.#http.get<IFindTest>(url);
    console.dir(result);
    return result;
  }

  readOneTests(id: number): Observable<ITest> {
    const url = `${this.getBaseURL()}/${id}`;
    return this.#http.get<ITest>(url);
  }

  updateTest(test: ITest): Observable<void> {
    const url = `${this.getBaseURL()}`;
    return this.#http.put<void>(url, test);
  }

  deleteTest(id: number): Observable<void> {
    const url = `${this.getBaseURL()}/${id}`;
    return this.#http.delete<void>(url);
  }

}
