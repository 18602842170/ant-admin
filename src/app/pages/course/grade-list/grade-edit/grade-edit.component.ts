import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../../course.service';
import { NzMessageService } from 'ng-zorro-antd';
import { IGrade } from '../../../../shared/service/grade/grade.service';

@Component({
  selector: 'app-grade-edit',
  templateUrl: './grade-edit.component.html',
  styleUrls: ['./grade-edit.component.less']
})
export class GradeEditComponent implements OnInit {

  grade: IGrade = {};
  gradeList: any[] = [];

  pageCon = {
    id: null,
    selectDate: null,
    startDate: null,
    endDate: null,
    distiguishId: 0,

    yearError : false,
    distiguishError: false,
    startError: false,
    endError: false,
  };

  constructor(
    private router: Router,
    private courseService: CourseService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {

    this.courseService.getGradeList({
      cd: 'CD00004'
    })
    .$observable
    .subscribe(allot => {
        this.gradeList = allot.results;
    });
    const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const id = searchParams.get('id');
        if (id) {
            const ids = +id;
            this.pageCon.id = +id;
            this.courseService.getGrade(ids)
                .$observable
                .subscribe(results => {
                    this.grade = results;
                });
        } else {

        }
  }

  submit() {

  // 判断是否为空
    if (! this.grade.gradeYear) {
      this.pageCon.yearError = true;
      return;
    }
    if (! this.grade.distiguishId) {
      this.pageCon.distiguishError = true;
      return;
    }
    if (! this.grade.startDate) {
      this.pageCon.startError = true;
      return;
    }
    if (this.grade.endDate === null) {
      this.pageCon.endError = true;
      return;
    }


    // let year = null;
    // let month1 = null;
    // let month2 = null;
    // let day1 = null;
    // let day2 = null;
    // let startTime1 = '';
    // let endTime1 = '';

    // if ( this.grade.gradeYear != null) {
    //   year = this.grade.gradeYear.getFullYear();
    // }
    // if ( this.grade.startDate != null) {
    //   month1 = this.grade.startDate.getMonth() + 1 ;
    //   day1 = this.grade.startDate.getDate();
    //   startTime1 = month1.toString() + '-' + day1.toString();
    // }
    // if ( this.grade.endDate != null) {
    //   month2 = this.grade.endDate.getMonth() + 1 ;
    //   day2 = this.grade.endDate.getDate();
    //   endTime1 = month2.toString() + '-' + day2.toString();
    // }

    this.courseService.gradeUpdate({
        id: this.pageCon.id,
        gradeYear: this.grade.gradeYear,
        distiguishId: +this.grade.distiguishId === 0 ? null : this.grade.distiguishId,
        startDate: this.grade.startDate,
        endDate: this.grade.endDate,
      })
        .$observable
        .subscribe(iuser => {
            this.router.navigateByUrl(`pages/course/grade-list`);
            this.message.create('success', '操作成功');
        });
}

cancel() {
    this.router.navigateByUrl(`pages/course/grade-list`);
}
}
