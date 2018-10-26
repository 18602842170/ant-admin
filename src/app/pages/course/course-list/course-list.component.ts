import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ICourse } from '../../../shared/service/course/courses.service';
import { CourseDetailService } from '../../../shared/service/coursedetail/coursedetail.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.less']
})
export class CourseListComponent implements OnInit {
  icourse: ICourse[] = [];
  result: any[] = [];
  _displayData: Array<any> = [];
  presult: any[] = [];
  subjectResult: any[] = [];
  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    name: '',
    gradeId: 0,
    subjectId: 0,

};


  constructor(
    private courseDetailService: CourseDetailService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private courseService: CourseService,
    private router: Router

  ) {  }

  ngOnInit() {
    this.courseService.getGradeList({
      cd: 'CD00001',
    })
    .$observable
    .subscribe(grade => {
      this.presult = grade.results;
      this.courseService.getSubjectList({
        cd: 'CD00002',
      }).$observable.subscribe(result => {
        this.subjectResult = result.results.filter(f => {
            return f.id !== 0;
        });
    });

       });
  }


  search() {

    this.pageCon.page = 1;
    this.loadStaffList();
}

create() {
  this.router.navigateByUrl(`/pages/course/course-add`);
}
edit(id: number) {
  this.router.navigateByUrl(`/pages/course/course-add?id=${id}`);
}
evaluate(id: number) {
  this.router.navigateByUrl(`/pages/course/course-evaluate?id=${id}`);
}

signUp(id: number) {

  // this.router.navigateByUrl(`/pages/course/course-signup?id=${id}`);
  this.router.navigateByUrl(`/pages/course/course-signup-list?id=${id}`);
}

delete(id: number) {
  this.courseService.courseDelete(id).$observable.subscribe(icoureses => {
  // 删除该课程对应的课时

  this.courseDetailService.query({
    courseId : id,
    is_delete: false,
  }).$observable.subscribe(result => {
    if (result.results) {
      for (let i = 0; i < result.results.length; i ++) {
        this.courseService.removeCourseDetail(result.results[i].id).$observable.subscribe(icouresesa => {


        });


      }
    }


  });

    this.loadStaffList();
    this.message.create('success', '删除成功');

  });
}


  private newMethod() {
    return 0;
  }

arranging(id: number, coursNumber: number) {

  this.router.navigateByUrl(`/pages/course/course-arranging?id=${id}&coursNumber=${coursNumber}`);

}

_displayDataChange($event) {
  this._displayData = $event;
}

searchTeacherList() {

  this.pageCon.page = 1;

  this.loadStaffList();


}

  changePage(event) {

  this.pageCon.page = +event;

  // this.pageCon.offset = this.pageCon.pageSize * (this.pageCon.page - 1);

  this.loadStaffList();
  }

  loadStaffList() {

    this.courseService.getCoursesList({

      pageSize: this.pageCon.pageSize,
      pageNum: this.pageCon.page,
      name: this.pageCon.name,
      gradeId: +this.pageCon.gradeId === 0 ? null : this.pageCon.gradeId,
      subjectId: +this.pageCon.subjectId === 0 ? null : this.pageCon.subjectId,
    }).$observable
      .subscribe(queryResults => {
        if (queryResults.results) {
          this.icourse = queryResults.results;
          this.pageCon.count = queryResults.count;
        } else {
          this.pageCon.count = 0;
        }
      });




  }

  cancel = function () {
    this.message.info('取消操作');
  };

  confirm = (id: number) => {

    this.courseService.courseDelete(id).$observable.subscribe(icoureses => {
      // 删除该课程对应的课时

      this.courseDetailService.query({
        courseId : id,
        is_delete: false,
      }).$observable.subscribe(result => {
        if (result.results) {
          for (let i = 0; i < result.results.length; i ++) {
            this.courseService.removeCourseDetail(result.results[i].id).$observable.subscribe(icouresesa => {


            });
          }
        }
      });
        this.loadStaffList();
        this.message.create('success', '删除成功');
      });

  }
}
