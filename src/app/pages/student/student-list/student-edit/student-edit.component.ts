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
    selector: 'app-student-edit',
    templateUrl: './student-edit.component.html',
    styleUrls: ['./student-edit.component.less']
})
export class StudentEditComponent implements OnInit {
    student: IStudent = {};
    sexs = [];
    presult: any[] = [];

    isFromUserPage;

    // submit验证用
    nameError = false;
    phoneError = false;
    schoolError = false;
    ageError = false;
    sexError = false;
    gradeError = false;
    parentsError = false;
    studentParama = {
        id : 0,
        studentName: '',
        studentPhone: '',
        studentSchool: '',
        studentSex: '',
        studentGrade: null,
        studentAge: '',
      };
    constructor(
        private message: NzMessageService,
        private studentPageService: StudentPageService,
        private router: Router,
    ) {
    }

    ngOnInit() {

        this.sexs = [{ value: '0', label: '男' }, { value: '1', label: '女' }];
        this.studentPageService.getDistinguishList({
            cd: 'CD00001'
          })
          .$observable
          .subscribe(allot => {
              this.presult = allot.results;
          });

        const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const id = searchParams.get('id');

        const fromuserpage = searchParams.get('fromuserpage');
        if (fromuserpage === 'yes') {
          this.isFromUserPage = true;
        } else {
          this.isFromUserPage = false;
        }

        if (id) {
            const ids = +id;
            this.studentParama.id = +id;
            this.studentPageService.getStudent(ids)
                .$observable
                .subscribe(results => {
                    this.student = results;
                });
        } else {

        }
    }

    submit() {
    // 判断是否为空
        // if (! this.student.studentSchool) {
        //     this.schoolError = true;
        //     return;
        // }
        // if (! this.student.studentAge) {
        //     this.ageError = true;
        //     return;
        // }
        // if (! this.student.studentGrade) {
        //     this.gradeError = true;
        //     return;
        // }
        // if (! this.student.studentSex) {
        //     this.sexError = true;
        //     return;
        // }S

        this.studentPageService.studentUpdate({
            id : this.studentParama.id,
            studentName: this.student.studentName,
            studentPhone: this.student.studentPhone,
            studentSchool: this.student.studentSchool,
            studentSex: this.student.studentSex,
            studentGrade: this.student.studentGrade,
            studentAge: this.student.studentAge,
            parents: this.student.parents
          })
            .$observable
            .subscribe(iuser => {
                if (this.isFromUserPage) {
                    this.router.navigateByUrl(`pages/users/users-list`);
                } else {
                    this.router.navigateByUrl(`pages/student/student-list`);
                }
                this.message.create('success', '操作成功');
            });
    }

    cancel() {
        if (this.isFromUserPage) {
            this.router.navigateByUrl(`pages/users/users-list`);
        } else {
            this.router.navigateByUrl(`pages/student/student-list`);
        }

    }


}
