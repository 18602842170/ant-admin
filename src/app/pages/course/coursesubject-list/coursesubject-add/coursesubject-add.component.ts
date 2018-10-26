import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { GetUserBySessionIdService } from '../../../../shared/service/users/getUserBySession.service';
import { NullAstVisitor, ClassStmt } from '@angular/compiler';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';
import { LoginService } from '../../../../shared/service/login.service';
@Component({
  selector: 'app-coursesubject-add',
  templateUrl: './coursesubject-add.component.html',
  styleUrls: ['./coursesubject-add.component.less']
})
export class CoursesubjectAddComponent implements OnInit {
  data = {
    createUserId: null,
    updateUserId: null,
    tpName: '',
    cd: '',
    nameError: false,
};
  constructor(
    private router: Router,
    private courseService: CourseService,
    private loginService: LoginService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.data.createUserId = + this.loginService.user.id;
    this.data.updateUserId = + this.loginService.user.id;
  }


  submit() {
    if (this.data.tpName === null ||  this.data.tpName.length === 0 || this.data.tpName === '') {

      this.data.nameError = true;
    }

      this.courseService.subjectCreate({
        cd: 'CD00002',
        cdName: '科目',
        tpName: this.data.tpName,
        createUserId: this.data.createUserId,
        updateUserId: this.data.updateUserId,
      }).$observable
      .subscribe(icourse => {
        this.router.navigateByUrl(`pages/course/coursesubject-list`);
        this.message.create('success', '操作成功');
      });
  }

  cancel() {
    this.router.navigateByUrl(`pages/course/coursesubject-list`);
}

}
