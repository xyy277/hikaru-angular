import {HttpService} from './http.service';
import {Injectable} from '@angular/core';
import {UserManagerModel} from '../model/UserManager.model';


@Injectable()
export class UserManagerService extends HttpService {


  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  getUserManagerListCount(user: UserManagerModel): Promise<any> {
    return this.http.post( this.getDomin() + '/user/count', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  getUserManagerListOnPage(user: UserManagerModel): Promise<any> {
    return this.http.post( this.getDomin() + '/user/list', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  getUserById(id: string): Promise<any> {
    return this.http.get( this.getDomin() + '/user/fetch/' + id)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  saveUser(user: UserManagerModel): Promise<any> {
    return this.http.post( this.getDomin() + '/user/add/', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  removeUserById(id: string): Promise<any> {
    return this.http.get( this.getDomin() + '/user/remove/' + id)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  updateUser(user: UserManagerModel): Promise<any> {
    return this.http.post( this.getDomin() + '/user/update', user)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

}
