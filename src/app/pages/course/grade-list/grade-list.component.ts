import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ICourse } from '../../../shared/service/course/courses.service';
import { CourseDetailService } from '../../../shared/service/coursedetail/coursedetail.service';
import { IGrade } from '../../../shared/service/grade/grade.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.less']
})
export class GradeListComponent implements OnInit {

  igrade: IGrade[] = [];
  gradeList: any[] = [];

  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    name: '',
    selectDate: null,
    distiguishId: 0,
  };

  constructor(
    private courseDetailService: CourseDetailService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseService.getGradeList({
      cd: 'CD00004'
    })
    .$observable
    .subscribe(allot => {
        this.gradeList = allot.results;
    });
  }

  add() {
    this.router.navigateByUrl(`/pages/course/grade-add`);
  }
  changePage(event) {

    this.pageCon.page = +event;

    this.searchGradeList(false);
  }

  searchGradeList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }

    let year = null;
    if ( this.pageCon.selectDate != null) {
      year = this.pageCon.selectDate.getFullYear();
    }

    this.courseService.getGradeTotalList({

      pageSize: this.pageCon.pageSize,
      pageNum: this.pageCon.page,
      distiguishId: +this.pageCon.distiguishId === 0 ? null : this.pageCon.distiguishId,
      searchYear: +year,
    }).$observable
      .subscribe(queryResults => {
        if (queryResults.results) {
          this.igrade = queryResults.results;
          this.pageCon.count = queryResults.count;
        } else {
          this.igrade = [];
          this.pageCon.count = 0;
        }
      });
  }

  edit (id: number) {
    this.router.navigateByUrl(`/pages/course/grade-edit?id=${id}`);
  }

  cancel = function () {
    this.message.info('取消操作');
  };

  confirm = (id: number) => {
    this.courseService.gradeDelete(id).$observable.subscribe(isubjects => {
      // 删除该课程对应的课时
          this.message.create('success', '删除成功');
          this.searchGradeList(false);
      });

  }

}
