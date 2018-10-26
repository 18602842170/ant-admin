import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { CourseAllotService, ICourseAllot } from '../../../../shared/service/courseAllot/courseAllot.service';
import { CourseAllotsService } from '../course-signup/courseallot.service';


@Component({
  selector: 'app-course-signup-list',
  templateUrl: './course-signup-list.component.html',
  styleUrls: ['./course-signup-list.component.less']
})
export class CourseSignupListComponent implements OnInit {
  icourseAllot: ICourseAllot[] = [];

  pageCon = {
    page: 1,
    count: 0,
    offset: 0,
    pageSize: 5,
    name: '',
    gradeId: 0,
    subjectId: 0,

};
  data = {
   courseId: null,
  };

  constructor(
    private courseAllotsService: CourseAllotsService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private router: Router

  ) { }

  ngOnInit() {
    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    this.data.courseId = searchParams.get('id');
  }

  changePage(event) {
    this.pageCon.page = +event;

    // this.pageCon.offset = this.pageCon.pageSize * (this.pageCon.page - 1);

    this.loadStaffList();
    }

    loadStaffList() {

      this.courseAllotsService.getCoursesList({
        courseId: this.data.courseId,
        userType: '2',

      }).$observable
        .subscribe(queryResults => {
          if (queryResults.results) {
            this.icourseAllot = queryResults.results;
            for (let i = 0; i < queryResults.results.length; i++) {
              if (queryResults.results[i].isCharge) {

              }


            }
            this.pageCon.count = queryResults.count;
          } else {
            this.pageCon.count = 0;
          }
        });
    }

    signup() {
      this.router.navigateByUrl(`/pages/course/course-signup?id=${this.data.courseId}`);

    }
}
