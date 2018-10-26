import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { IClassroom } from '../../../../shared/service/classroom/classroom.service';
import { ClassroomPageService } from '../../classroomPage.service';

@Component({
    selector: 'app-classroom-add',
    templateUrl: './classroom-add.component.html',
    styleUrls: ['./classroom-add.component.less']
})
export class ClassroomAddComponent implements OnInit {
    classroom: IClassroom[] = [];


    nameError = false;
    addressError = false;
    peopleError = false;
    classroomParama = {
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

    }

    submit() {
        // 判断是否为空
        if (! this.classroomParama.classroomName) {
            this.nameError = true;
            return;
        }
        if (! this.classroomParama.classroomAddress) {
            this.addressError = true;
            return;
        }
        if (! this.classroomParama.classroomPeople) {
            this.peopleError = true;
            return;
        }

        this.classroomPageService.classroomCreate({
            classroomName: this.classroomParama.classroomName,
            classroomAddress: this.classroomParama.classroomAddress,
            classroomPeople: this.classroomParama.classroomPeople
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
