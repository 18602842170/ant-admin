import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../shared/service/teacher/teacher.service';
import { Router } from '@angular/router';
import { IDepositteacher } from '../../../shared/service/teacher/depositteacher.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../course.service';
import { ICoursereserve } from '../../../shared/service/course/coursereserve.service';

@Component({
  selector: 'app-coursereserve-list',
  templateUrl: './coursereserve-list.component.html',
  styleUrls: ['./coursereserve-list.component.less']
})
export class CoursereserveListComponent implements OnInit {

  list: ICoursereserve[] = [];

  classResult: any[] = [];

  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      courseId: 0,
      reserveCode: '',
      phoneNumber: ''
  };

  constructor(
    private courseService: CourseService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    // 获取课程list
    this.courseService.getCoursesList({}).$observable.subscribe( results1 => {
      this.classResult = results1.results.filter(f => {
        return f.id !== 0;
      });
    });
  }

  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchList(searchBtnFlg: boolean) {

    if (searchBtnFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }

    this.courseService.getCoursereserveList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        courseId:  this.pageCon.courseId,
        reserveCode:  this.pageCon.reserveCode,
        phoneNumber:  this.pageCon.phoneNumber

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.list = recordData.results;
            this.pageCon.count = recordData.count;
          } else {
            this.pageCon.count = 0;
            this.list = [];
          }

          if (searchBtnFlg) {
              // 如果是查询按钮点击查询
              this.pageCon.page = 1;
          }
    });
  }

}
