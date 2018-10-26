import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticePageService } from '../noticePage.service';
import { INotice } from '../../../shared/service/notice/notice.service';
import { LoginService } from '../../../shared/service/login.service';
import { ICourse } from '../../../shared/service/course/courses.service';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.component.html',
  styleUrls: ['./notice-add.component.less']
})
export class NoticeAddComponent implements OnInit {

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  userId: number;
  presult: any[] = [];
  presultEnd: any[] = [];
  course: ICourse[] = [];

  noticeParama = {
    userId: 0,
    noticeTitle: '',
    noticeContent: '',
    noticeTarget: null,
  };

   // submit验证用
   titleError = false;
   contentError = false;
   targetError = false;
   searchFlg = false;

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private noticePageService: NoticePageService,
    private loginService: LoginService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.noticeParama.userId = this.loginService.user.id;
    const id = this.loginService.user.id;
    if (id) {
      const ids = +id;
      this.noticeParama.userId = +id;
      this.noticePageService.getAllotList({
        userId: ids
      })
      .$observable
      .subscribe(allot => {
        if (allot.results && allot.results.length > 0) {
          for ( let i = 0; i < allot.results.length; i ++ ) {
            this.searchFlg = false;
            for ( let j = 0; j < this.presultEnd.length; j ++) {
              if ( this.presultEnd[j].courseId === allot.results[i].courseId) {
                this.searchFlg = true;
              }
            }
            if (this.searchFlg === false) {
              this.presultEnd.push(allot.results[i]);
            }
          }
        }
      });
    } else {
      this.noticeParama.userId = null;
    }
  }

sumbit() {
   // 判断是否为空
   if (! this.noticeParama.noticeTitle) {
    this.titleError = true;
    return;
  }
  if (! this.noticeParama.noticeContent) {
    this.contentError = true;
    return;
  }
  if (this.noticeParama.noticeTarget === null) {
    this.targetError = true;
    return;
  }

  this.noticePageService.noticeCreate({
    noticeTitle: this.noticeParama.noticeTitle,
    noticeContent: this.noticeParama.noticeContent,
    userId: this.noticeParama.userId,
    noticeTarget: this.noticeParama.noticeTarget
    })
      .$observable
      .subscribe(iuser => {
          this.router.navigateByUrl(`pages/notice/notice-list`);
          this.message.create('success', '操作成功');
      });
}

cancel() {
    this.router.navigateByUrl(`pages/notice/notice-list`);
  }
}
