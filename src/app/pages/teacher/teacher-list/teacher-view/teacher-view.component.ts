import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../../teacherPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ICourseDetail } from '../../../../shared/service/coursedetail/coursedetail.service';
import { and } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-teacher-view',
  templateUrl: './teacher-view.component.html',
  styleUrls: ['./teacher-view.component.less']
})
export class TeacherViewComponent implements OnInit {

  icourseDetail: ICourseDetail[] = [];

  dates: string[] = [];

  iteachers: ITeacher[] = [];

  userId;

  constructor(
    private teacherPageService: TeacherPageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // 页面进入通过前画面传入id取得教师信息
    const searchParams = new URLSearchParams(location.search.slice(1));

    this.userId = searchParams.get('id');

    this.teacherPageService.getCourseDetailList({
      
      userId: +this.userId

    })
    .$observable
    .subscribe(recordData => {
        // 取得教师后
        if(recordData){
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



  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/teacher/teacher-list`);
  }

  // 显示选中日的课程
  showCourseInfo(_date){

    const sdate = _date.split('-');

    this.teacherPageService.getCourseDetailList({
      
      userId: +this.userId,
      searchYear : +sdate[0],
      searchMonth : +sdate[1],
      searchDay : +sdate[2]

    })
    .$observable
    .subscribe(recordData => {
        // 取得教师后
        if(recordData){
          if (recordData.results && recordData.results.length > 0) {
            this.icourseDetail = recordData.results;
          } else {
            this.icourseDetail = [];
          }
        }
    });
  }

  // 查询当日有无课程
  findCourses(_date){

    return this.dates.includes(_date)

  }

}
