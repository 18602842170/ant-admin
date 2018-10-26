import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CourseService } from '../../course.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-grade-add',
  templateUrl: './grade-add.component.html',
  styleUrls: ['./grade-add.component.less']
})
export class GradeAddComponent implements OnInit {

  gradeList: any[] = [];

  pageCon = {
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
  }

  submit() {

  // 判断是否为空
    if (! this.pageCon.selectDate) {
      this.pageCon.yearError = true;
      return;
    }
    if (! this.pageCon.distiguishId) {
      this.pageCon.distiguishError = true;
      return;
    }
    if (! this.pageCon.startDate) {
      this.pageCon.startError = true;
      return;
    }
    if (this.pageCon.endDate === null) {
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
    // if ( this.pageCon.selectDate != null) {
    //   year = this.pageCon.selectDate.getFullYear();
    // }
    // if ( this.pageCon.startDate != null) {
    //   month1 = this.pageCon.startDate.getMonth() + 1 ;
    //   day1 = this.pageCon.startDate.getDate();
    //   startTime1 = month1.toString() + '-' + day1.toString();
    // }
    // if ( this.pageCon.endDate != null) {
    //   month2 = this.pageCon.endDate.getMonth() + 1 ;
    //   day2 = this.pageCon.endDate.getDate();
    //   endTime1 = month2.toString() + '-' + day2.toString();
    // }

    this.courseService.gradeCreate({
        gradeYear: this.pageCon.selectDate,
        distiguishId: +this.pageCon.distiguishId === 0 ? null : this.pageCon.distiguishId,
        startDate: this.pageCon.startDate,
        endDate: this.pageCon.endDate ,
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
