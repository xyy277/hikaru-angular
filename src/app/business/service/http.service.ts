import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from '../common/service/config.service';


@Injectable()
export class HttpService {

  protected domain: string;
  protected attachDomain: string;
  protected headers: Headers;

  constructor(protected http: Http,
              protected config: ConfigService) {
    this.headers = new Headers({'content-type': 'application/json'});
  }

  getHttp(): Http {
    return this.http;
  }

  getDomin() {
    this.domain = this.domain = location.protocol + '//' + '192.168.145.1:8888/hikaru';
    this.config.get('hikaruServer').then(value => {
      console.log(value);
      if (value) {
        this.domain = value;
      }
    });
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
