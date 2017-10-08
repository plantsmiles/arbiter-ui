import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiUrl: string;

  constructor(private http: Http) {
    this.apiUrl = environment.apiUrl;
  }

  public makeCall(urlPart: string, options?: any): Promise<any> {
    return this.http.request(this.getUrl(urlPart), options).toPromise();
  }

  public makeObservableCall(urlPart: string, options?: any): Observable<any> {
    return this.http.request(this.getUrl(urlPart), options)
      .map((res: Response) => res.json());
  }

  private getUrl(urlPart): string {
    return `${this.apiUrl}${urlPart}`;
  }

}
