import {BaseModel} from './BaseModel';
import {Pagination} from './Pagination';

export class UserManagerModel extends BaseModel {
  id: string;
  name: string;
  username: string;
  password: string;
  age: number;
  online: number;
  disable: boolean;
  pagination: Pagination;
  constructor() {
    super(); }
}
