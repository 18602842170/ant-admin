import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../../course.service';
import { CourseDetailService } from '../../../../shared/service/coursedetail/coursedetail.service';
import { CourseDetailsService } from './arranging-detail/coursedetails.service';

@Component({
  selector: 'app-course-arranging',
  templateUrl: './course-arranging.component.html',
  styleUrls: ['./course-arranging.component.less']
})
export class CourseArrangingComponent implements OnInit {
  dates: string[] = [];
  id: String ;
  courseNumber: String ;
  constructor(

    private message: NzMessageService,
    private router: Router,
    private courseService: CourseService,
    private courseDetailsService: CourseDetailsService,

  ) { }

  ngOnInit() {

    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    this.id = searchParams.get('id');
    this.courseNumber = searchParams.get('coursNumber');

    this.courseService.getCourseDetailList({
      courseId: +this.id

    })
    .$observable
    .subscribe(recordData => {
        // 取得教师后
        if(recordData) {
          if (recordData.results && recordData.results.length > 0) {
            for ( let i = 0; i < recordData.results.length; i ++ ) {
                if (recordData.results[i].courseDayStr) {
                  this.dates.push(recordData.results[i].courseDayStr);
                }
              }
          }
        }
    });

  }

  arrangingCourse (_date) {

    // tslint:disable-next-line:max-line-length
    this.router.navigateByUrl(`pages/course/course-arranging/arranging-detail?id=${this.id}&date=${_date}&courseNumber=${this.courseNumber}`);

  }

  // 查询当日有无课程
  findCourses(_date) {

    return this.dates.includes(_date);

  }

  ifNoCourses(_date) {
    if (this.dates.includes(_date)) {
      return false;
    } else {
      return true;
    }
  }

  deleteThisCourseDetail(_date) {

    this.courseDetailsService.deleteByDate({
      courseDay: _date,
      courseId: +this.id,

    }).$observable
    .subscribe(queryResults => {
      this.router.navigateByUrl(`/pages/course/course-arrangings?id=${this.id}&coursNumber=${this.courseNumber}`);
      this.message.create('success', '删除课时成功');
    });
  }
}
