import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../../course.service';
import { IDistinguish } from '../../../../shared/service/distinguish/distinguish.service';
import { LoginService } from '../../../../shared/service/login.service';

@Component({
    selector: 'app-coursesubject-edit',
    templateUrl: './coursesubject-edit.component.html',
    styleUrls: ['./coursesubject-edit.component.less']
})
export class CoursesubjectEditComponent implements OnInit {
    subject: IDistinguish = {};

    // submit验证用
    subjectParama = {
        id: null,
        createUserId: null,
        updateUserId: null,
        tpName: '',
        nameError : false
      };
    constructor(
        private message: NzMessageService,
        private courseService: CourseService,
        private loginService: LoginService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.subjectParama.updateUserId = + this.loginService.user.id;
        const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const id = searchParams.get('id');
        if (id) {
            const ids = +id;
            this.subjectParama.id = +id;
            this.courseService.getSubject(ids)
                .$observable
                .subscribe(results => {
                    this.subject = results;
                });
        } else {

        }
    }

    submit() {
    // 判断是否为空
        if (! this.subject.tpName) {
            this.subjectParama.nameError = true;
            return;
        }

        this.courseService.subjectUpdate({
            id : this.subjectParama.id,
            cd : 'CD00002',
            cdName : '科目',
            tpName: this.subject.tpName,
            updateUserId: this.subjectParama.updateUserId,
          })
            .$observable
            .subscribe(iuser => {
                this.router.navigateByUrl(`pages/course/coursesubject-list`);
                this.message.create('success', '操作成功');
            });
    }

    cancel() {
        this.router.navigateByUrl(`pages/course/coursesubject-list`);

    }


}
