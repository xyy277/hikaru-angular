import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HttpService {

  protected domain: string;
  protected attachDomain: string;
  protected headers: Headers;

  constructor(protected http: Http ) {
    this.headers = new Headers({'content-type': 'application/json'});
  }

  getHttp(): Http {
    return this.http;
  }

  getDomin() {
    this.domain = 'localhost:8888/hikaru';
    return this.domain;
  }

  get(path: string, headers?: Map<string, string>): Observable<Response> {
    if (headers) {
      headers.forEach((value, key) => {
        this.headers.set(key, value);
      });
    }
    return this.http.get(this.getDomin() + path, {headers: this.headers});
  }

  post(path: string, data: any, headers?: Map<string, string>): Observable<Response> {
    if (headers) {
      headers.forEach((value, key) => {
        this.headers.set(key, value);
      });
    }
    return this.http.post(this.getDomin() + path, JSON.stringify(data), {headers: this.headers});
  }

  put(path: string, data: any, headers?: Map<string, string>): Observable<Response> {
    if (headers) {
      headers.forEach((value, key) => {
        this.headers.set(key, value);
      });
    }
    return this.http.put(this.getDomin() + path, JSON.stringify(data), {headers: this.headers});
  }

  delete(path: string, headers?: Map<string, string>): Observable<Response> {
    if (headers) {
      headers.forEach((value, key) => {
        this.headers.set(key, value);
      });
    }
    return this.http.delete(this.attachDomain + path, {headers: this.headers});
  }

  upload(path: string, formData: FormData) {
    return this.http.post(this.attachDomain +  path, formData);
  }

}
