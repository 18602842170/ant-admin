import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../teacherPage.service';
import { Router } from '@angular/router';

// 这个teacher-list的ts相当于教师一览画面的js
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.less']
})
export class TeacherListComponent implements OnInit {

  // 这个iteacher是ITeacher类型的，在teacher的Service中有定义，可以理解这是交给画面展示用的dto集
  iteachers: ITeacher[] = [];


  leveloptions = [];
  levelselected;

  // 这个pageCon可以理解为画面要传入后台的元素，即pageCondition
  // 可以看到pageCon中的几个变量，分页所需要的参数，查询条件等等，这些名称和后台Form或dto中对应
  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      teacherName: '',
      teacherCd: '',
      teacherLevel: ''
  };

  constructor(
    // 构造器
    // 把父模块teacher中的teacherPageService拿来使用
    private teacherPageService: TeacherPageService,
    private router: Router
  ) { }

  ngOnInit() {
    // ngOnInit等效于以前js里的$(JQuery)页面初期化
    // 画面一进入就会进入这个ngOnInit里

    // 这个示范是在初期化调用teacherPageService里的查询方法
    // getTeacherList后的括号里是传入后台的参数，这里传入teacherName，取pageCon里的
    // this.teacherPageService.getTeacherList({teacherName:this.pageCon.teacherName})
    //         .$observable
    //         .subscribe(recordData => {
    //           // 这个等效于以前ajax的回调，即查询成功后，返回，最后返回的结果都在recordDate里
    //           // recordDate中的resultlist是查询返回的结果集，这里把这个结果集赋值给页面的iteachers
    //           this.iteachers = recordData.results;
    // });
    this.leveloptions = [
      { value: '', label: '全部' },
      { value: '1', label: '实习教师' },
      { value: '2', label: '一级教师' },
      { value: '3', label: '二级教师' },
      { value: '4', label: '特级教师' }
    ];

    this.levelselected = this.leveloptions[0];

  }


  // 这个方法在本画面中作为翻页方法使用，如果画面采用了翻页，在html中写好翻页插件后。
  // 插件里的(nzPageIndexChange)="changePage($event)"将会指向这个方法
  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchTeacherList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchTeacherList(searchBtnFlg: boolean) {

    if (searchBtnFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }

    this.teacherPageService.getTeacherList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        teacherName: this.pageCon.teacherName,
        teacherCd: this.pageCon.teacherCd,
        teacherLevel: this.levelselected.value

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.iteachers = recordData.results;
            this.pageCon.count = recordData.count;
          } else {
            this.pageCon.count = 0;
            this.iteachers = [];
          }

          if (searchBtnFlg) {
              // 如果是查询按钮点击查询
              this.pageCon.page = 1;
          }
    });
  }

  // 新建教师
  createTeacher() {
    this.router.navigateByUrl(`/pages/teacher/teacher-add`);
  }

  // 编辑教师详细信息
  edit(id: number) {
    this.router.navigateByUrl(`/pages/teacher/teacher-edit?id=${id}`);
  }

  // 查看教师课程分配
  view(id : number){
    this.router.navigateByUrl(`/pages/teacher/teacher-view?id=${id}`);
  }

}
