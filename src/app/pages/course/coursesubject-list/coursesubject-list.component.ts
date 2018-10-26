import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ICourse } from '../../../shared/service/course/courses.service';
import { CourseDetailService } from '../../../shared/service/coursedetail/coursedetail.service';
import { IDistinguish, DistinguishService } from '../../../shared/service/distinguish/distinguish.service';
import { LoginService } from '../../../shared/service/login.service';

@Component({
  selector: 'app-coursesubject-list',
  templateUrl: './coursesubject-list.component.html',
  styleUrls: ['./coursesubject-list.component.less']
})
export class CoursesubjectListComponent implements OnInit {
  isubject: IDistinguish[] = [];

  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    subjectName: '',
    createName: '',
    updateUserId: null,
};


  constructor(
    private courseDetailService: CourseDetailService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private courseService: CourseService,
    private loginService: LoginService,
    private router: Router

  ) {  }

  ngOnInit() {
    this.pageCon.updateUserId = + this.loginService.user.id;
  }


create() {
  this.router.navigateByUrl(`/pages/course/coursesubject-add`);
}
edit(id: number) {
  this.router.navigateByUrl(`/pages/course/coursesubject-edit?id=${id}`);
}


  changePage(event) {

    this.pageCon.page = +event;

    this.searchSubjectList(false);
  }

  searchSubjectList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }
    this.courseService.getSubjectList({
      pageSize: this.pageCon.pageSize,
      pageNum: this.pageCon.page,
      cd: 'CD00002',
      tpName: this.pageCon.subjectName,
      createName: this.pageCon.createName,
    }).$observable
      .subscribe(queryResults => {
        if (queryResults.results) {
          this.isubject = queryResults.results;
          this.pageCon.count = queryResults.count;
        } else {
          this.pageCon.count = 0;
          this.isubject = [];
        }
      });
  }

  cancel = function () {
    this.message.info('取消操作');
  };

  confirm = (id: number) => {

    this.courseService.subjectDelete(id).$observable.subscribe(isubjects => {
      // 删除该课程对应的课时
          this.message.create('success', '删除成功');
          this.searchSubjectList(false);
      });

  }
}
