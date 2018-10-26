import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { IUsers, UsersService } from '../../../../shared/service/users/users.service';
import { PAGE_EDIT_MAP } from '../../../../shared/service/users/const';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../../../../shared/service/users/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { IStudent } from '../../../../shared/service/student/student.service';
import { IClassroom } from '../../../../shared/service/classroom/classroom.service';
import { ClassroomPageService } from '../../classroomPage.service';

@Component({
    selector: 'app-classroom-edit',
    templateUrl: './classroom-edit.component.html',
    styleUrls: ['./classroom-edit.component.less']
})
export class ClassroomEditComponent implements OnInit {
    classroom: IClassroom = {};
    sexs = [];
    presult: any[] = [];

    // submit验证用
    nameError = false;
    addressError = false;
    peopleError = false;

    classroomParama = {
        id: null,
        classroomName: '',
        classroomAddress: '',
        classroomPeople: null
      };
    constructor(
        private message: NzMessageService,
        private classroomPageService: ClassroomPageService,
        private router: Router,
    ) {
    }

    ngOnInit() {

        const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const id = searchParams.get('id');
        if (id) {
            const ids = +id;
            this.classroomParama.id = +id;
            this.classroomPageService.getClassroom(ids)
                .$observable
                .subscribe(results => {
                    this.classroom = results;
                });
        } else {

        }
    }

    submit() {
    // 判断是否为空
        if (! this.classroom.classroomName) {
            this.nameError = true;
            return;
        }
        if (! this.classroom.classroomAddress) {
            this.addressError = true;
            return;
        }
        if (! this.classroom.classroomPeople) {
            this.peopleError = true;
            return;
        }

        this.classroomPageService.classroomUpdate({
            id : this.classroomParama.id,
            classroomName: this.classroom.classroomName,
            classroomAddress: this.classroom.classroomAddress,
            classroomPeople: this.classroom.classroomPeople
          })
            .$observable
            .subscribe(iuser => {
                this.router.navigateByUrl(`pages/classroom/classroom-list`);
                this.message.create('success', '操作成功');
            });
    }

    cancel() {
        this.router.navigateByUrl(`pages/classroom/classroom-list`);

    }


}
