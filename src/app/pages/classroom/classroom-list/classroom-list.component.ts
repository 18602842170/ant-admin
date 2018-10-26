import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../../shared/service/student/student.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ClassroomPageService } from '../classroomPage.service';
import { IClassroom } from '../../../shared/service/classroom/classroom.service';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.less']
})
export class ClassroomListComponent implements OnInit {

  // 这个iteacher是ITeacher类型的，在teacher的Service中有定义，可以理解这是交给画面展示用的dto集
  iclassroom: IClassroom[] = [];

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      classroomName : '',
      classroomAddress: '',
      classroomPeople: null
  };

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private classroomPageService: ClassroomPageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {

  }


  // 这个方法在本画面中作为翻页方法使用，如果画面采用了翻页，在html中写好翻页插件后。
  // 插件里的(nzPageIndexChange)="changePage($event)"将会指向这个方法
  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchClassroomList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchClassroomList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }
    this.classroomPageService.getClassroomList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        classroomName : this.pageCon.classroomName,
        classroomAddress: this.pageCon.classroomAddress,
        classroomPeople: this.pageCon.classroomPeople

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.iclassroom = recordData.results;
            this.pageCon.count = recordData.count;
        } else {
            this.pageCon.count = 0;
            this.iclassroom = [];
        }
    });
  }

// 新建教室
createClassroom() {
  this.router.navigateByUrl(`/pages/classroom/classroom-add`);
}

// 编辑教室
edit(id: number) {
    this.router.navigateByUrl(`/pages/classroom/classroom-edit?id=${id}`);
}

// 删除学员
delete(id: number) {
  this.classroomPageService.classroomDelete(id).$observable
      .subscribe(queryResults => {
          this.message.create('success', '操作成功');
          this.searchClassroomList(false);
      });
}

cancel = function () {
  this.message.info('取消操作');
  };

confirm (id: number) {
    this.classroomPageService.classroomDelete(id).$observable
    .subscribe(queryResults => {
        this.message.create('success', '删除成功');
        this.searchClassroomList(false);
    });
  }

}
