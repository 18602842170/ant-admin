import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { IRollCall } from '../../../../shared/service/rollCall/rollCall.service';
import { ICourse } from '../../../../shared/service/course/courses.service';
import { IStudent } from '../../../../shared/service/student/student.service';
@Component({
  selector: 'app-course-evaluate',
  templateUrl: './course-evaluate.component.html',
  styleUrls: ['./course-evaluate.component.less']
})
export class CourseEvaluateComponent implements OnInit {
  presult: any[] = [];
  irollCall: IRollCall[] = [];
  course: ICourse = {};
  istudents: IStudent[] = [];

  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    userId: null,
    courseId: null,
    courseDayStr: '',
    startTime: '',
    endTime: '',
    comment: '',
    courseDate: null
};
  constructor(
    private router: Router,
    private courseService: CourseService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    const courseId = searchParams.get('id');
    if (courseId) {
      const ids = +courseId;
      this.pageCon.courseId = +courseId;
      this.courseService.getCourse(ids)
            .$observable
            .subscribe(results => {
                this.course = results;
                this.courseService.getStudentList({})
                .$observable.subscribe(recordData => {
                    // 这里依然是查询完成后的回调函数块
                    if (recordData.results) {
                      this.istudents = recordData.results;
                  } else {
                      this.istudents = [];
                  }
              });
          });
      } else {

      }
  }


  cancel() {
    this.router.navigateByUrl(`pages/course/course-list`);
  }



// 这个方法在本画面中作为翻页方法使用，如果画面采用了翻页，在html中写好翻页插件后。
  // 插件里的(nzPageIndexChange)="changePage($event)"将会指向这个方法
  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchRollCallList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchRollCallList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }
    let year = null;
    let month = null;
    let day = null;
    if ( this.pageCon.courseDate != null) {
      year = this.pageCon.courseDate.getFullYear();
      month = this.pageCon.courseDate.getMonth() + 1;
      day = this.pageCon.courseDate.getDate();
    }

    this.courseService.getRollCallList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        userId: this.pageCon.userId,
        courseId: this.pageCon.courseId,
        searchYear: +year,
        searchMonth: +month ,
        searchDay: +day

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.irollCall = recordData.results;
            this.pageCon.count = recordData.count;
        } else {
            this.pageCon.count = 0;
            this.irollCall = [];
        }
    });
  }

}
