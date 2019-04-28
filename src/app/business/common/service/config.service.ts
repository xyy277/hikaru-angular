import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ConfigService {

  static instance: ConfigService = null;

  config: any = undefined;

  static getInstance(http: Http): ConfigService {
    if (ConfigService.instance === null) {
      ConfigService.instance = new ConfigService(http);
    }
    return ConfigService.instance;
  }

  constructor (private http: Http) {

  }

  get(key: string | Array<string>): Promise<any> {
    if (this.config) {
      if (key instanceof Array) {
        return Promise.resolve(this.readKey(key));
      } else {
        return Promise.resolve(this.config[key]);
      }
    } else {
      return this.http.get('./config.json')
        .map(res => {
          const config = res.json;
          this.config = config;
          return config;
        })
        .map(res => {
          if (key instanceof Array) {
            return this.readKey(key);
          } else {
            return res[key];
          }
        })
        .toPromise();
    }
  }

  private readKey(keys: Array<string>) {
    const result: any = [];
    keys.forEach(key => {
      result.put(this.config[key]);
    });
    return result;
  }
}
