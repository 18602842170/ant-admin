import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { IUsers, UsersService } from '../../../../shared/service/users/users.service';
import { PAGE_EDIT_MAP } from '../../../../shared/service/users/const';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../../../../shared/service/users/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StudentPageService } from '../../studentPage.service';
import { IStudent } from '../../../../shared/service/student/student.service';
import { Alert } from 'selenium-webdriver';
import { ICourseDetail } from '../../../../shared/service/coursedetail/coursedetail.service';

@Component({
    selector: 'app-student-course',
    templateUrl: './student-course.component.html',
    styleUrls: ['./student-course.component.less']
})
export class StudentCourseComponent implements OnInit {
    student: IStudent = {};
    icourseDetail: ICourseDetail[] = [];
    dates: string[] = [];
    coursedetailParama = {
        // 以下页面查询条件
        userId : 0,
        courseDay : ''
    };
    constructor(
        private message: NzMessageService,
        private studentPageService: StudentPageService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const userId = searchParams.get('id');
        if (userId) {
            this.coursedetailParama.userId = +userId;
        } else {
            this.coursedetailParama.userId = null;
        }

        this.studentPageService.getCourseDetailList({
          userId: +userId
        })
        .$observable
        .subscribe(recordData => {
            // 取得教师后
            if (recordData) {
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

// 当前日期下是否有课
  findCourses(_date) {
    return this.dates.includes(_date);
  }

// 查询课程下的具体信息
    searchCourseInfor(_date) {
        const sdate = _date.split('-');
        this.studentPageService.getCourseDetailList({
            userId: this.coursedetailParama.userId,
            searchYear : +sdate[0],
            searchMonth : +sdate[1],
            searchDay : +sdate[2]
          })
            .$observable
            .subscribe((recordData) => {
                if (recordData.results) {
                    this.icourseDetail = recordData.results;
                } else {
                    this.icourseDetail = [];
                }
            });

    }

    cancel() {
        this.router.navigateByUrl(`pages/student/student-list`);
    }


}
