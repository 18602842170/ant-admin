import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ExceptionService } from '../exception.service';

@Component({
  selector: 'app-exception-trigger',
  templateUrl: './exception-trigger.component.html',
  styleUrls: ['./exception-trigger.component.less']
})
export class ExceptionTriggerComponent implements OnInit {

  createNotification = (type) => {
    this._notification.create(type, '这是标题', '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案');
  }
  constructor(private _notification: NzNotificationService, private exceptionService: ExceptionService
  ) {
  }

  ngOnInit() {
  }

  creat() {
    // this.exceptionService.cuser()
    //   .subscribe(user => {
    //     console.log(user);
    //   });

    // this.exceptionService.usersCreate({ name: '1111', password: '111' })
    //   .$observable
    //   .subscribe(user => {
    //     console.log(user);
    //   });
  }

  update() {
    this.exceptionService.usersUpdate({ id: 3, name: '1111', password: '111' })
      .$observable
      .subscribe(user => {
        console.log(user);
        console.log(user.id);
      });
  }

  delete() {
    this.exceptionService.usersDelete(3)
      .$observable
      .subscribe(user => {
        console.log('success');
      });
  }

  search() {
    this.exceptionService.getUser(7)
      .$observable
      .subscribe(user => {
        console.log(user);
      });
  }

  search2() {
    this.exceptionService.getUsersList({})
      .$observable
      .subscribe(user => {
        console.log(user);
      });
  }

}
