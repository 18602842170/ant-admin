import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../../teacherPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.less']
})



export class TeacherAddComponent implements OnInit {

  iteachers: ITeacher[] = [];

  teacherParama = {
      teacherName: '',
      teacherCd: '',
      teacherLevel: '',
      teacherSex: ''
  };

  constructor(
    private teacherPageService: TeacherPageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }

  createTeacher() {
    // this.teacherPageService.teacherCreate({
    //   teacherCd: this.teacherParama.teacherCd,
    //   teacherName: this.teacherParama.teacherName,
    //   teacherLevel: this.teacherParama.teacherLevel,
    //   teacherSex: this.teacherParama.teacherSex
    // })
    //   .$observable
    //   .subscribe(recordData => {
    //       this.router.navigateByUrl(`pages/teacher/teacher-list`);
    //       this.message.create('success', '新建成功');
    //   });
  }

  // 关闭画面
  cancel(){
    this.router.navigateByUrl(`pages/teacher/teacher-list`);
  }

  test(_date){
    alert(_date);
  }

  test2(){
    return true;
  }

}
