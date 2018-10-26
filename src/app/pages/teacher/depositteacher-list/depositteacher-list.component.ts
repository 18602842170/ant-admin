import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../../shared/service/teacher/teacher.service';
import { TeacherPageService } from '../teacherPage.service';
import { Router } from '@angular/router';
import { IDepositteacher } from '../../../shared/service/teacher/depositteacher.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-depositteacher-list',
  templateUrl: './depositteacher-list.component.html',
  styleUrls: ['./depositteacher-list.component.less']
})
export class DepositteacherListComponent implements OnInit {

  list: IDepositteacher[] = [];


  leveloptions = [];
  levelselected;

  pageCon = {
      page: 1,
      count: 0,
      offset: 0,
      pageSize: 5,
      // 以下页面查询条件
      teacherName: '',
      classRoomName: ''
  };

  constructor(
    private teacherPageService: TeacherPageService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  changePage(event) {

    // 设置页码
    this.pageCon.page = +event;

    //  执行查询
    this.searchTeacherDepositList(false);
}

  // 翻页会调用的查询方法，和ngOnInit里的方法一样，这里把具体的翻页参数传入，如果需要其他参数，一并写在后面
  searchTeacherDepositList(searchBtnFlg: boolean) {

    if (searchBtnFlg) {
      // 如果点查询按钮进入，重新从第一页查询
      this.pageCon.page = 1;
    }

    this.teacherPageService.getDepositTeacherList({
        pageSize: this.pageCon.pageSize,
        pageNum: this.pageCon.page,
        teacherNameInUser: this.pageCon.teacherName,
        classRoomName: this.pageCon.classRoomName

    }).$observable.subscribe(recordData => {
          // 这里依然是查询完成后的回调函数块
          if (recordData.results) {
            this.list = recordData.results;
            this.pageCon.count = recordData.count;
          } else {
            this.pageCon.count = 0;
            this.list = [];
          }

          if (searchBtnFlg) {
              // 如果是查询按钮点击查询
              this.pageCon.page = 1;
          }
    });
  }

  // 新建教师托管
  createTeacherDeposit() {
    this.router.navigateByUrl(`/pages/teacher/teacher-deposit-add`);
  }

  // 编辑教师详细信息
  edit(id: number) {
    this.router.navigateByUrl(`/pages/teacher/teacher-deposit-edit?id=${id}`);
  }

  delete(id: number){
    this.teacherPageService.deleteTeacherDeposit(id)
      .$observable
      .subscribe(recordData => {
          this.message.create('success', '删除成功');
          this.searchTeacherDepositList(false);
      });
  }


}
