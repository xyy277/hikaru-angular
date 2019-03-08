import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../../../service/user-manager.service';
import {UserManagerModel} from '../../../model/UserManager.model';
import {alertService} from '../../../../common/service/alert.service';
import {Router} from '@angular/router'; // 保存着这个HeroDetailComponent实例的路由信息

@Component({
  selector: 'user-add',
  templateUrl: './user-add.html',
  styleUrls: ['./user-add.css']
})
export class UserManagerAdd implements OnInit {
  params = {
    keyword: null
  };
  user: UserManagerModel = new UserManagerModel();
  id: string;
  rules: any = {
    name: [
      {
        required: true,
        message: '请输入姓名'
      },
      {
        validator: function (value) {
          if (value.length > 3) {
            return '名字不能太长哦';
          }
        }
      }
    ],
    age: [
      {
        required: true,
        message: '请输入年龄'
      },
      {
        validator: function (value) {
          if (value < 0) {
            return '虽然你年轻得像逆生长，但年龄必须是正数哦';
          }
        }
      }
    ]
  };
  constructor(
    private route: Router,
    private alert: alertService,
    private userManagerService: UserManagerService) {
  }

  ngOnInit() {
    console.log('===');
    const self = this;
    self.user.disable = false;
  }

  async saveUser() {
    const self = this;
    let success = false;
    self.user.online = 0;
    await self.userManagerService.saveUser(self.user)
      .then(value => {
        success = value.success;
        if (value.success) {
          this.alert.success('保存成功');
        } else {
          this.alert.error('保存失败');
        }
      });
    if (success) {
      setTimeout(() => {
        this.route.navigateByUrl('user/list');
      }, 500);
    }
  }

  async updateStatus(disable) {
    const self = this;
    self.user.disable = disable;
  }

}
