import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest } from './service-request';
import { QuestionAnswer } from './question-answer';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CityworksService {
  qaMap: any;

  constructor(private http: HttpClient) { }

  private getSRUrl = 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/getServiceRequest/';
  private getQuestionAnswerUrl = 'http://rhsoaprdapp1.ci.raleigh.nc.us:8183/RaleighAPI/cityworks/getQuestionAnswer/';

  getServiceRequest(requestid): Observable<ServiceRequest> {
    const url = this.getSRUrl + requestid;
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(this.srUrl, this.testSr, options).map((res: Response) => res.json());

    return this.http.get<ServiceRequest>(url);
  }

  getQuestionAnswer(problemSid): Observable<QuestionAnswer> {
    const url = this.getQuestionAnswerUrl + problemSid;
    // const headers = new Headers({ 'Content-Type': 'application/json' });
    // const options = new RequestOptions({ headers: headers }); // Create a request option
    // return this.http.post(this.srUrl, this.testSr, options).map((res: Response) => res.json());

    return this.http.get<QuestionAnswer>(url);
  }

  // getQuestionAnswerMap(problemSid): Observable<QuestionAnswer> {
  //   const url = this.getQuestionAnswerUrl + problemSid;

  //   return this.http.get<QuestionAnswer>(url).pipe(map(x => {
  //     return this.qaMap;
  //   }));
  // }
}

