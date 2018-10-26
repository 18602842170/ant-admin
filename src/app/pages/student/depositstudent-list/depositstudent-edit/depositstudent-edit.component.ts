import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../../../course/course.service';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';
import { StudentPageService } from '../../studentPage.service';

@Component({
  selector: 'app-depositstudent-edit',
  templateUrl: './depositstudent-edit.component.html',
  styleUrls: ['./depositstudent-edit.component.less']
})
export class DepositstudentEditComponent implements OnInit {

  studentResult: any[] = [];

  classroomResult: any[] = [];

  depositId: string;

  teacherId_number: number;

  // 是否来自用户画面跳转
  isFromUserPage;

  data = {
      userId:0,
      classroomId:0,
      teacherName: '',
      classroomName: '',
      startDate:null,
      endDate:null,
      dateRange: null,
      foodError: false,
      studentError: false,
      classroomError: false,
      dateError: false,
      needfood:''

  };

  // submit验证用
  nameError = false;
  cdError = false;

  constructor(
    private studentPageService: StudentPageService,
    private router: Router,
    private message: NzMessageService,
    private classroomService: ClassroomService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    // 页面进入通过前画面传入id取得教师信息
    const searchParams = new URLSearchParams(location.search.slice(1));
    this.depositId = searchParams.get('id'); 
    
        // 获取教师list
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
    
    // 获取托管信息
    this.studentPageService.getStudentDeposit(+this.depositId)
    .$observable
    .subscribe(recordData => {
        // 取得教师后
        if(recordData){
            this.data.userId = recordData.studentUserId;
            this.data.classroomId = recordData.classRoomId;
            this.data.teacherName = recordData.studentNameInUser;
            this.data.classroomName = recordData.classRoomName;
            this.data.needfood = recordData.foodFlag;
            this.data.dateRange = [new Date(recordData.depositStartDate),new Date(recordData.depositEndDate)]
        }
    });

  }

  edit() {

    if(this.data.userId === 0){
      this.data.studentError = true;
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

    this.studentPageService.updateDepositStudent({
      id:+this.depositId,
      studentUserId: this.data.userId,
      classRoomId: this.data.classroomId,
      depositStartDate: this.data.dateRange[0],
      depositEndDate: this.data.dateRange[1],
      foodFlag:this.data.needfood
    })
      .$observable
      .subscribe(recordData => {
          this.router.navigateByUrl(`pages/student/student-deposit`);
          this.message.create('success', '编辑成功');
      });
  }

  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/student/student-deposit`);
  }

}
