import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import {
    PAGE_EDIT_MAP, USER_PAGE_MAP, FORM_PAGE_MAP, Dashboard_PAGE_MAP, LIST_PAGE_MAP,
    PROFILE_PAGE_MAP, RESULT_PAGE_MAP, EXCEPTION_PAGE_MAP, STYLE_PAGE_MAP
} from '../../../../shared/service/users/const';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService, IRole } from '../../../../shared/service/users/role.service';
import { Location } from '@angular/common';
import { ALL_PAGE_OBJ } from '../../../../shared/service/page-const';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../user.service';

@Component({
    selector: 'app-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: ['./role-add.component.less']
})
export class RoleAddComponent implements OnInit {

    role: IRole = { permissionMap: new Map() };
    pe: Map<string, string> = new Map();
    userPageList: any[] = [];
    dashboardPageList: any[] = [];
    formPageList: any[] = [];
    listPageList: any[] = [];
    profilePageList: any[] = [];
    resultPageList: any[] = [];
    exceptionPageList: any[] = [];
    stylePageList: any[] = [];
    pageEditList: any[] = [];
    pageReady = false;
    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private message: NzMessageService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }
    ngOnInit() {
        this.pageReady = true;
        const addressUrl = location.search.slice(1);
        const searchParams = new URLSearchParams(addressUrl);
        const id = searchParams.get('id');

        if (id) {
            this.userService.getRole(+id)
                .$observable
                .subscribe(role => {
                    this.role = role;
                    this.setNzCard();
                });
        } else {
            this.setNzCard();
        }
    }


    submit() {
        if (this.role.id) {
            this.userService.rolesUpdate(this.role)
                .$observable
                .subscribe(iuser => {
                    if (iuser) {
                        this.router.navigateByUrl(`pages/users/role-list`);
                        this.message.create('success', '操作成功');
                    }
                });
        } else {
            this.userService.rolesCreate(this.role)
                .$observable
                .subscribe(iuser => {
                    if (iuser) {
                        this.router.navigateByUrl(`pages/users/role-list`);
                        this.message.create('success', '操作成功');
                    }
                });
        }
    }

    cancel() {
        this.router.navigateByUrl(`pages/users/role-list`);
    }

    setNzCard() {
        this.pageEditList = transferToObject(PAGE_EDIT_MAP, 'value', 'name');
        this.userPageList = transferToObject(USER_PAGE_MAP, 'value', 'name');
        this.dashboardPageList = transferToObject(Dashboard_PAGE_MAP, 'value', 'name');
        this.formPageList = transferToObject(FORM_PAGE_MAP, 'value', 'name');
        this.listPageList = transferToObject(LIST_PAGE_MAP, 'value', 'name');
        this.profilePageList = transferToObject(PROFILE_PAGE_MAP, 'value', 'name');
        this.resultPageList = transferToObject(RESULT_PAGE_MAP, 'value', 'name');
        this.exceptionPageList = transferToObject(EXCEPTION_PAGE_MAP, 'value', 'name');
        this.stylePageList = transferToObject(STYLE_PAGE_MAP, 'value', 'name');
        this.pageReady = true;
    }

}

