import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../../shared/service/student/student.service';
import { StudentPageService } from '../studentPage.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less']
})
export class StudentListComponent implements OnInit {

  // 这个iteacher是ITeacher类型的，在teacher的Service中有定义，可以理解这是交给画面展示用的dto集
  istudents: IStudent[] = [];

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      studentNumber : '',
      studentName: '',
      studentSchool: ''
  };

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private studentPageService: StudentPageService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // ngOnInit等效于以前js里的$(JQuery)页面初期化
    // 画面一进入就会进入这个ngOnInit里

    // 这个示范是在初期化调用teacherPageService里的查询方法
    // getTeacherList后的括号里是传入后台的参数，这里传入teacherName，取pageCon里的
    // this.studentPageService.getStudentList({studentName:this.pageCon.studentName})
    //         .$observable
    //         .subscribe(recordData => {
    //           // 这个等效于以前ajax的回调，即查询成功后，返回，最后返回的结果都在recordDate里
    //           // recordDate中的resultlist是查询返回的结果集，这里把这个结果集赋值给页面的iteachers
    //           this.istudents = recordData.results;
    // });

  }


  // 这个方法在本画面中作为翻页方法使用，如果画面采用了翻页，在html中写好翻页插件后。
  // 插件里的(nzPageIndexChange)="changePage($event)"将会指向这个方法
  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchStudentList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchStudentList(searchFlg: boolean) {
    if (searchFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }
    this.studentPageService.getStudentList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        studentName: this.pageCon.studentName ,
        studentSchool: this.pageCon.studentSchool

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.istudents = recordData.results;
            this.pageCon.count = recordData.count;
        } else {
            this.pageCon.count = 0;
            this.istudents = [];
        }
    });
  }

// 新建学员
createStudent() {
  this.router.navigateByUrl(`/pages/student/student-add`);
}

// 编辑学员
edit(id: number) {
    this.router.navigateByUrl(`/pages/student/student-edit?id=${id}`);
}

// 删除学员
delete(id: number) {
  this.studentPageService.studentDelete(id).$observable
      .subscribe(queryResults => {
          this.message.create('success', '操作成功');
          this.searchStudentList(false);
      });
}

// 查询课程
searchCourse(id: number) {
  this.router.navigateByUrl(`/pages/student/student-course?id=${id}`);
}

}
