import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../../teacherPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';
import { CourseService } from '../../../course/course.service';

@Component({
  selector: 'app-depositteacher-add',
  templateUrl: './depositteacher-add.component.html',
  styleUrls: ['./depositteacher-add.component.less']
})



export class DepositteacherAddComponent implements OnInit {

  tearchersResult: any[] = [];

  classroomResult: any[] = [];

  iteachers: ITeacher[] = [];

  teacherParama = {
      teacherName: '',
      teacherCd: '',
      teacherLevel: '',
      teacherSex: ''
  };

  data = {
    userId:0,
    classroomId:0,
    teacherError: false,
    classroomError: false,
    dateError: false,
    startDate:null,
    endDate:null,
    dateRange:null
  };

  constructor(
    private teacherPageService: TeacherPageService,
    private router: Router,
    private message: NzMessageService,
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) { }

  ngOnInit() {

    // 获取教师list
    this.courseService.getTeachersList({}).$observable.subscribe( results => {

        this.tearchersResult = results.results.filter(f => {
          return f.id !== 0;
        });

        // 获取教室list
        this.classroomService.query({}).$observable.subscribe( results1 => {
          this.classroomResult = results1.results.filter(f => {
            return f.id !== 0;
          });
        });
    });
  }

  createTeacher() {

    if(this.data.userId === 0){
      this.data.teacherError = true;
      return;
    }

    if(this.data.classroomId === 0){
      this.data.classroomError = true;
      return;
    }

    if(this.data.dateRange == null || !this.data.dateRange[0] || !this.data.dateRange[1]){
      this.data.dateError = true;
      return;
    }

    this.teacherPageService.createDepositTeacher({
      teacherUserId: this.data.userId,
      classRoomId: this.data.classroomId,
      depositStartDate: this.data.dateRange[0],
      depositEndDate: this.data.dateRange[1]
    })
      .$observable
      .subscribe(recordData => {
          this.router.navigateByUrl(`pages/teacher/teacher-deposit`);
          this.message.create('success', '新建成功');
      });
  }

  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/teacher/teacher-deposit`);
  }


}
