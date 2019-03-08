import {Component, OnInit} from '@angular/core';
import {UserManagerModel} from '../../model/UserManager.model';
import {UserManagerService} from '../../service/user-manager.service';
import {Pagination} from '../../model/Pagination';
import {PaginationComponent} from '../../../common/components/pagination/pagination.component';

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.html',
  styleUrls: ['./user-manager.css']
})
export class UserManager implements OnInit {
  date: any;
  data = [];
  dataCount: number;
  pageConfig: any;
  page = new Pagination();
  params = {
    name: null
  };
  labelList = [
    '姓名',
    '年龄',
    '是否在线',
    '操作时间',
    '操作人',
    '是否禁用',
    '操作'
  ];
  userModel: UserManagerModel = new UserManagerModel();
  userModelList: UserManagerModel[];

  constructor(private userManagerService: UserManagerService) {
  }

  ngOnInit() {
    const self = this;
    self.getPageData(1);
  }

  async count() {
    const self = this;
    await self.userManagerService.getUserManagerListCount(this.userModel).then(value => {
      self.dataCount = value.data;
    });
    this.pageConfig = {
      totalNum: self.dataCount,
      curPage: 1
    };
    return self.dataCount;
  }

  async getPageData(curPageNo) {
    this.page.pageIndex = curPageNo;
    await this.count();
    this.page.pageSize = 20;
    if (this.dataCount < this.page.pageSize) {
      this.page.pageSize = this.dataCount;
    }
      const sorts = [];
    sorts.push('name');
    this.page.sorts = sorts;
    this.page.order = 'DESC';
    this.userModel.pagination = this.page;
    this.userManagerService.getUserManagerListOnPage(this.userModel)
      .then((reps) => {
        this.data = reps.data;
      });
  }

  async delete(id: string) {
    let success = false;
    await this.userManagerService.removeUserById(id)
      .then( reps => {
        success = reps.success;
      });
    if (success) {
      this.getPageData(this.page.pageIndex);
    }
  }

  async updateUser(disable, id: string) {
    const self = this;
    const user = new UserManagerModel();
    user.id = id;
    user.disable = disable;
    await this.userManagerService.updateUser(user)
      .then(value => {
        if (value.success) {

        }
      });
  }

  search(name) {
    this.userModel.name = name;
    this.getPageData(1);
  }

  dateSearch(date) {
    const self = this;
    this.userModel.optTime = date;
    self.getPageData(1);
  }
}
