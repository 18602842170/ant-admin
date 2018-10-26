import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { IUsers, UsersService } from '../../../../shared/service/users/users.service';
import { PAGE_EDIT_MAP } from '../../../../shared/service/users/const';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../../../../shared/service/users/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StudentPageService } from '../../studentPage.service';
import { IStudent } from '../../../../shared/service/student/student.service';

@Component({
    selector: 'app-student-add',
    templateUrl: './student-add.component.html',
    styleUrls: ['./student-add.component.less']
})
export class StudentAddComponent implements OnInit {
    student: IStudent[] = [];

    studentParama = {
        studentNumber: '',
        studentName: '',
        studentPhone: '',
        studentSchool: '',
        studentSex: '',
        studentGrade: null,
        studentAge: ''
      };
    constructor(
        private message: NzMessageService,
        private studentPageService: StudentPageService,
        private router: Router,
    ) {
    }

    ngOnInit() {

    }

    submit() {
        this.studentPageService.studentCreate({
            studentName: this.studentParama.studentName,
            studentPhone: this.studentParama.studentPhone,
            studentSchool: this.studentParama.studentSchool,
            studentSex: this.studentParama.studentSex,
            studentGrade: this.studentParama.studentGrade,
            studentAge: this.studentParama.studentAge
          })
            .$observable
            .subscribe(iuser => {
                this.router.navigateByUrl(`pages/student/student-list`);
                this.message.create('success', '操作成功');
            });
    }

    cancel() {
        this.router.navigateByUrl(`pages/student/student-list`);
    }


}
