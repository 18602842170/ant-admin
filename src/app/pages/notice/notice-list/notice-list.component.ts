import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NoticePageService } from '../noticePage.service';
import { INotice } from '../../../shared/service/notice/notice.service';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.less']
})
export class NoticeListComponent implements OnInit {

  // 这个iteacher是ITeacher类型的，在teacher的Service中有定义，可以理解这是交给画面展示用的dto集
  inotices: INotice[] = [];

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      noticeTitle : '',
      userName: '',
      noticeDate: null
  };

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private noticePageService: NoticePageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }


  // 这个方法在本画面中作为翻页方法使用，如果画面采用了翻页，在html中写好翻页插件后。
  // 插件里的(nzPageIndexChange)="changePage($event)"将会指向这个方法
  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchNoticeList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchNoticeList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }
    let year = null;
    let month = null;
    let day = null;
    if ( this.pageCon.noticeDate != null) {
      year = this.pageCon.noticeDate.getFullYear();
      month = this.pageCon.noticeDate.getMonth() + 1;
      day = this.pageCon.noticeDate.getDate();
    }

    this.noticePageService.getNoticeList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        noticeTitle: this.pageCon.noticeTitle,
        publishName: this.pageCon.userName,
        searchYear: +year,
        searchMonth: +month ,
        searchDay: +day

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.inotices = recordData.results;
            this.pageCon.count = recordData.count;
        } else {
            this.pageCon.count = 0;
            this.inotices = [];
        }
    });
  }

// 新建通知
createNotice() {
  this.router.navigateByUrl(`/pages/notice/notice-add`);
}

// 删除通知
cancel = function () {
  this.message.info('取消操作');
  };

confirm (id: number) {
    this.noticePageService.noticeDelete(id).$observable
    .subscribe(queryResults => {
        this.message.create('success', '删除成功');
        this.searchNoticeList(false);
    });
  }

}
