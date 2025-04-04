import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFindTest, ITest } from '@mysmartfamily/shared-models';

const BASE_URL = '/api/datas/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  readonly #http = inject(HttpClient);

  createTest(test: ITest): Observable<void> {
    const url = `${BASE_URL}`;
    return this.#http.post<void>(url, test);
  }

  readAllTest(): Observable<ITest[]> {
    return this.#http.get<ITest[]>(BASE_URL+'/all');
  }

  readTests(filter: string, pageNumber: number, pageSize: number): Observable<IFindTest> {
    const url = `${BASE_URL}?filter=${filter}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const result = this.#http.get<IFindTest>(url);
    console.dir(result);
    return result;
  }

  readOneTests(id: number): Observable<ITest> {
    const url = `${BASE_URL}/${id}`;
    return this.#http.get<ITest>(url);
  }

  updateTest(test: ITest): Observable<void> {
    const url = `${BASE_URL}`;
    return this.#http.put<void>(url, test);
  }

  deleteTest(id: number): Observable<void> {
    const url = `${BASE_URL}/${id}`;
    return this.#http.delete<void>(url);
  }

}
