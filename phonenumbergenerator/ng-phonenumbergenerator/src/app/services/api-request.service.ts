import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  getPhoneNumberCombinations(phoneNumber: number): Observable<any>{
    return this.http.get(`http://localhost:8080/api/generate-combinations/${phoneNumber}`, {});
  }
}

export class StubApiRequestService {

  getPhoneNumberCombinations(phoneNumber: number): Observable<any> {
    return observableOf([]);
  }

}

