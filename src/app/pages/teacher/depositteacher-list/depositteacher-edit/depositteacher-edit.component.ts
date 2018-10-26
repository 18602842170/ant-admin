import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../../teacherPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../../../course/course.service';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';

@Component({
  selector: 'app-depositteacher-edit',
  templateUrl: './depositteacher-edit.component.html',
  styleUrls: ['./depositteacher-edit.component.less']
})
export class DepositteacherEditComponent implements OnInit {

  tearchersResult: any[] = [];

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
      teacherError: false,
      classroomError: false,
      dateError: false

  };

  // submit验证用
  nameError = false;
  cdError = false;

  constructor(
    private teacherPageService: TeacherPageService,
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
    
    // 获取托管信息
    this.teacherPageService.getTeacherDeposit(+this.depositId)
    .$observable
    .subscribe(recordData => {
        // 取得教师后
        if(recordData){
            this.data.userId = recordData.teacherUserId;
            this.data.classroomId = recordData.classRoomId;
            this.data.teacherName = recordData.teacherNameInUser;
            this.data.classroomName = recordData.classRoomName;
            this.data.dateRange = [new Date(recordData.depositStartDate),new Date(recordData.depositEndDate)]
        }
    });

  }

  edit() {
    
    console.log(this.data.dateRange);

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

    this.teacherPageService.updateDepositTeacher({
      id:+this.depositId,
      teacherUserId: this.data.userId,
      classRoomId: this.data.classroomId,
      depositStartDate: this.data.dateRange[0],
      depositEndDate: this.data.dateRange[1]
    })
      .$observable
      .subscribe(recordData => {
          this.router.navigateByUrl(`pages/teacher/teacher-deposit`);
          this.message.create('success', '编辑成功');
      });
  }

  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/teacher/teacher-deposit`);
  }

}
