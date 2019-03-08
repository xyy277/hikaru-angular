import {Component, OnInit} from '@angular/core';
import {UserManagerService} from '../../../service/user-manager.service';
import {UserManagerModel} from '../../../model/UserManager.model';
import {ActivatedRoute} from '@angular/router';
import {alertService} from '../../../../common/service/alert.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.css']
})
export class UserManagerDetail implements OnInit {
  userModel: UserManagerModel = new UserManagerModel();
  id: string;

  constructor( private route: ActivatedRoute,
               private alert: alertService,
               private userManagerService: UserManagerService) {
  }

  ngOnInit() {
    console.log('===');
    const self = this;
    self.id = this.route.snapshot.paramMap.get('id');
    self.getUserById(self.id);
  }


  getUserById(id: string) {
    const self = this;
    self.userManagerService.getUserById(id)
      .then(value => {
        if (value.success) {
          self.userModel = value.data;
        }
      });
  }

  async delete(id: string) {
    let success = false;
    await this.userManagerService.removeUserById(id)
      .then( reps => {
        success = reps.success;
      });
  }

  async updateStatus(disable) {
    const self = this;
    const user = new UserManagerModel();
    user.id = self.id;
    user.disable = disable;
    await this.userManagerService.updateUser(user)
      .then(value => {
        if (value.success && value.data) {
          this.alert.success('修改成功');
          self.getUserById(self.id);
        } else {
          this.alert.error('修改失败');
          self.userModel.disable = !self.userModel.disable;
        }
      });
  }

}
