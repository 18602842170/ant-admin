import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticePageService } from '../noticePage.service';
import { INotice } from '../../../shared/service/notice/notice.service';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.less']
})
export class NoticeEditComponent implements OnInit {

  // 这个iteacher是ITeacher类型的，在teacher的Service中有定义，可以理解这是交给画面展示用的dto集

  inotice: INotice = {};

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  userId: number;

  noticeParama = {
    id: 0,
    noticeTitle: '',
    noticeContent: ''
  };

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private noticePageService: NoticePageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    const id = searchParams.get('id');
    if (id) {
        const ids = +id;
        this.noticeParama.id = +id;
        this.noticePageService.getNotice(ids)
            .$observable
            .subscribe(results => {
                this.inotice = results;
            });
    } else {

    }
  }

sumbit() {
  this.noticePageService.noticeUpdate({
    id: this.noticeParama.id,
    noticeTitle: this.inotice.noticeTitle,
    noticeContent: this.inotice.noticeContent
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
