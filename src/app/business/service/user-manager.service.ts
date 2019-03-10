import {HttpService} from './http.service';
import {Injectable} from '@angular/core';
import {UserManagerModel} from '../model/UserManager.model';


@Injectable()
export class UserManagerService extends HttpService {

  private serverUrl  = location.protocol + '//' + location.hostname + ':8888/hikaru';

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getUserManagerListCount(user: UserManagerModel): Promise<any> {
    return this.http.post( this.serverUrl + '/user/count', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  getUserManagerListOnPage(user: UserManagerModel): Promise<any> {
    return this.http.post( this.serverUrl + '/user/list', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  getUserById(id: string): Promise<any> {
    return this.http.get( this.serverUrl + '/user/fetch/' + id)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  saveUser(user: UserManagerModel): Promise<any> {
    return this.http.post( this.serverUrl + '/user/add/', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  removeUserById(id: string): Promise<any> {
    return this.http.get( this.serverUrl + '/user/remove/' + id)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  updateUser(user: UserManagerModel): Promise<any> {
    return this.http.post( this.serverUrl + '/user/update', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

}
