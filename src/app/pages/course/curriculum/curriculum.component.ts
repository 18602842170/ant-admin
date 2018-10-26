import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';
import { ICourse } from '../../../shared/service/course/courses.service';
import { CourseDetailService } from '../../../shared/service/coursedetail/coursedetail.service';
import { ICoursetable } from '../../../shared/service/course/coursetable.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.less']
})
export class CurriculumComponent implements OnInit {

  icourse: ICoursetable[] = [];
  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    gradeId:0

  };

  
  presult: any[] = [];

  constructor(
    private courseDetailService: CourseDetailService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {

    this.courseService.getGradeList({
      cd: 'CD00001',
    })
    .$observable
    .subscribe(grade => {
      this.presult = grade.results;
    });

    this.loadStaffList();

  }

  add() {
    this.router.navigateByUrl(`/pages/course/grade-add`);
  }
  changePage(event) {

    this.pageCon.page = +event;

    // this.pageCon.offset = this.pageCon.pageSize * (this.pageCon.page - 1);

    this.loadStaffList();
  }

  loadStaffList() {

    this.courseService.getCoursesTableList({
      gradeId:this.pageCon.gradeId
    }).$observable
      .subscribe(queryResults => {
        if (queryResults.results) {
          this.icourse = queryResults.results;
          // this.pageCon.count = queryResults.count;
        } else {
          // this.pageCon.count = 0;
        }
      });
  }

}
