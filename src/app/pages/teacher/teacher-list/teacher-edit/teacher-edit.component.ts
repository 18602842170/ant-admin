import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../../teacherPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.less']
})
export class TeacherEditComponent implements OnInit {

  sexlistoptions = [];
  sexselected;

  leveloptions = [];
  levelselected;

  iteachers: ITeacher[] = [];

  teacherId: string;

  teacherId_number: number;

  // 是否来自用户画面跳转
  isFromUserPage;

  teacherParama = {
      teacherName: '',
      teacherCd: '',
      teacherLevel: '',
      teacherSex: '',
      teacherProfile:''
  };

  // submit验证用
  nameError = false;
  cdError = false;

  constructor(
    private teacherPageService: TeacherPageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // 页面进入通过前画面传入id取得教师信息
    const searchParams = new URLSearchParams(location.search.slice(1));
    this.teacherId = searchParams.get('id'); // 教师id
    
    let fromuserpage = searchParams.get('fromuserpage');
    if(fromuserpage === 'yes'){
      this.isFromUserPage = true;
    }else{
      this.isFromUserPage = false;
    }
    

    // 获取教师基本信息
    this.teacherPageService.getTeacher(+this.teacherId)
      .$observable
      .subscribe(recordData => {
          // 取得教师后
          if(recordData){
              this.teacherParama.teacherCd = recordData.teacherCd;
              this.teacherParama.teacherName = recordData.teacherName;
              this.teacherParama.teacherLevel = recordData.teacherLevel;
              this.teacherParama.teacherSex = recordData.teacherSex;
              this.teacherParama.teacherProfile = recordData.teacherProfile;

              this.sexlistoptions = [
                { value: '1', label: '男' },
                { value: '0', label: '女' }
              ];
              for (var i in this.sexlistoptions) {
                  if (this.sexlistoptions[i].value === recordData.teacherSex){
                      this.sexselected = this.sexlistoptions[i];
                  }
              }

              this.leveloptions = [
                { value: '1', label: '实习教师' },
                { value: '2', label: '一级教师' },
                { value: '3', label: '二级教师' },
                { value: '4', label: '特级教师' }
              ];

              for ( var i in this.leveloptions) {
                if (this.leveloptions[i].value === recordData.teacherLevel){
                    this.levelselected = this.leveloptions[i];
                }
            }
          }
      });
  }

  updateTeacher() {

    // 验证
    // if(!this.teacherParama.teacherCd){
    //   this.cdError = true;
    //   return;
    // }

    // if(!this.teacherParama.teacherName){
    //   this.nameError = true;
    //   return;
    // }

    let levelselected;
    if(this.levelselected === undefined){
      levelselected = '';
    }else{
      levelselected = this.levelselected.value;
    }

    let sexselected;
    if(this.sexselected === undefined){
      sexselected = '';
    }else{
      sexselected = this.sexselected.value;
    }

    this.teacherPageService.teacherUpdate({
      id: +this.teacherId,
      teacherCd: this.teacherParama.teacherCd,
      teacherName: this.teacherParama.teacherName,
      teacherLevel: levelselected,
      teacherSex: sexselected,
      teacherProfile: this.teacherParama.teacherProfile
    })
      .$observable
      .subscribe(recordData => {
          if(this.isFromUserPage){
            this.router.navigateByUrl(`pages/users/users-list`);
          }else{
            this.router.navigateByUrl(`pages/teacher/teacher-list`);
          }
          this.message.create('success', '编辑成功');
      });
  }

  // 关闭画面
  cancel(){
    if(this.isFromUserPage){
      this.router.navigateByUrl(`pages/users/users-list`);
    }else{
      this.router.navigateByUrl(`pages/teacher/teacher-list`);
    }
  }

}
