import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';
import { CourseService } from '../../../course/course.service';
import { StudentPageService } from '../../studentPage.service';

@Component({
  selector: 'app-depositstudent-add',
  templateUrl: './depositstudent-add.component.html',
  styleUrls: ['./depositstudent-add.component.less']
})



export class DepositstudentAddComponent implements OnInit {

  studentResult: any[] = [];

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
    foodError: false,
    studentError: false,
    classroomError: false,
    dateError: false,
    startDate:null,
    endDate:null,
    dateRange:null,
    needfood:''
  };

  constructor(
    private studentPageService: StudentPageService,
    private router: Router,
    private message: NzMessageService,
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) { }

  ngOnInit() {

    // 获取学员list
    this.studentPageService.getStudentList({}).$observable.subscribe( results => {

        this.studentResult = results.results.filter(f => {
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
      this.data.studentError = true;
      return;
    }

    if(this.data.classroomId === 0){
      this.data.classroomError = true;
      return;
    }

    if(this.data.needfood === ''){
      this.data.foodError = true;
      return;
    }

    if(this.data.dateRange == null || !this.data.dateRange[0] || !this.data.dateRange[1]){
      this.data.dateError = true;
      return;
    }

    this.studentPageService.createDepositStudent({
      studentUserId: this.data.userId,
      classRoomId: this.data.classroomId,
      depositStartDate: this.data.dateRange[0],
      depositEndDate: this.data.dateRange[1],
      foodFlag:this.data.needfood
    })
      .$observable
      .subscribe(recordData => {
          this.router.navigateByUrl(`pages/student/student-deposit`);
          this.message.create('success', '新建成功');
      });
  }

  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/student/student-deposit`);
  }


}
