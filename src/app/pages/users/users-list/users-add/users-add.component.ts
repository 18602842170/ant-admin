import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { IUsers, UsersService } from '../../../../shared/service/users/users.service';
import { PAGE_EDIT_MAP, USER_TYPE_MAP } from '../../../../shared/service/users/const';
import { transferToObject } from '../../../../shared/service/const';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RoleService } from '../../../../shared/service/users/role.service';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../user.service';
import { StudentPageService } from '../../../student/studentPage.service';
import { LoginService } from '../../../../shared/service/login.service';

@Component({
    selector: 'app-users-add',
    templateUrl: './users-add.component.html',
    styleUrls: ['./users-add.component.less']
})
export class UsersAddComponent implements OnInit {
    isEdit = false;
    noEdit = true;
    pe: Map<string, string> = new Map();
    result: any[] = [];
    presult: any[] = [];
    deptResult: any[] = [];
    userTypeList: any[] = [];
    pageReady = false;
    isNewCreat = false;
    data = {
        id: null,
        user_name: '',
        roleId: 0,
        deptId: 0,
        userType: '',
        phone_number: '',
        password: '',
        checkPassword: '',
        nikeName: '',
        nameError: false,
        nameinputError: false,
        nikeNameError: false,
        typeError: false,
        phoneNumBerError: false,
        roleError: false,
        deptError: false,
        passwordEoor: false,
        existEoor: false,
        userNameExistEoor: false,

    };
    // constructor(private users: Users) { }
    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private roleService: RoleService,
        private userService: UserService,
        private loginService: LoginService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }
    userForm: FormGroup;
    ngOnInit() {
        this.pageReady = true;
        this.userTypeList = transferToObject(USER_TYPE_MAP, 'value', 'name');
        this.userService.getRolesList({})
            .$observable
            .switchMap(roles => {
                this.presult = roles.results;
                this.userService.getDepartmentList({})
                    .$observable
                    .subscribe(result => {
                        this.deptResult = result.results.filter(f => {
                            return f.pId !== 0;
                        });
                    });
                return this.activatedRoute.queryParamMap;
            })
            .map(params => params.get('id'))
            .subscribe(id => {
                if (id) {
                    const ids = +id;
                    this.userService.getUser(ids)
                        .$observable
                        .subscribe(results => {
                            this.data.id = results.id;
                            this.data.user_name = results.name;
                            this.data.nikeName = results.nikeName;
                            this.data.phone_number = results.phoneNumber;
                            this.data.userType = results.userType;
                            this.data.roleId = results.roleId;
                            this.data.deptId = results.deptId;
                            this.pageReady = true;
                            // 查询到用户
                            this.isEdit = true;
                            this.noEdit = false;
                        });
                } else {
                    this.pageReady = true;
                    this.isNewCreat = true;

                }
            });
    }

    submit() {
        if (this.data.user_name === null || this.data.user_name.length === 0 || this.data.user_name === '') {

            this.data.nameError = true;

        } else if (this.data.phone_number === null || this.data.phone_number.length === 0 || this.data.phone_number === '') {

            this.data.nameError = false;
            this.data.phoneNumBerError = true;

        } else if (this.data.roleId === null || this.data.roleId === 0) {

            this.data.phoneNumBerError = false;
            this.data.roleError = true;


        } else if (this.data.password !== this.data.checkPassword) {
            this.data.deptError = false;

            this.data.passwordEoor = true;
        } else if ((this.data.userType === null || this.data.userType === '') && (this.data.roleId !== 4) ) {

            this.data.typeError = true;

        } else if (this.data.nikeName === null || this.data.nikeName === '') {

            this.data.nikeNameError = true;

        } else {
            this.data.passwordEoor = false;
            if (!/^[A-Za-z0-9]+$/.test(this.data.user_name)) {
                this.data.nameinputError = true;
            } else {
                // 手机号码排重
                this.loginService.getRepeatName(this.data.user_name)
                    .switchMap(ree => {
                        if (!this.data.id) {
                            if (ree > 0) {
                                this.data.userNameExistEoor = true;
                            } else {
                                this.data.userNameExistEoor = false;
                            }
                        }
                        return this.userService.getUsersList({
                            phoneNumber: this.data.phone_number,
                        }).$observable;
                    })
                    .subscribe(iusers => {
                        if (iusers.results !== null && iusers.results.length > 0 && iusers.results[0].id !== this.data.id) {
                            this.data.existEoor = true;
                        } else if (this.data.userNameExistEoor) {
                            this.data.userNameExistEoor = true;
                        } else {
                            if (!this.isNewCreat) {

                            this.userService.usersUpdate({
                                id: this.data.id,
                                phoneNumber: this.data.phone_number,
                                nikeName: this.data.nikeName,
                                roleId: this.data.roleId,
                                deptId: this.data.deptId,
                            })
                                .$observable
                                .subscribe(iuser => {
                                    this.router.navigateByUrl(`pages/users/users-list`);
                                    this.message.create('success', '操作成功');
                                });
                        } else {

                            if (this.data.roleId === 4) {

                                this.data.userType = '';

                            }
                            this.userService.usersCreate({
                                name: this.data.user_name,
                                phoneNumber: this.data.phone_number,
                                nikeName: this.data.nikeName,
                                roleId: this.data.roleId,
                                userType: this.data.userType,
                                deptId: this.data.deptId,
                                password: this.data.password,

                                }).$observable
                                    .subscribe(iuser => {
                                        this.router.navigateByUrl(`pages/users/users-list`);
                                        this.message.create('success', '操作成功');
                                        if (this.data.userType === '1') {
                                            this.userService.teacherCreate({
                                                userId: iuser.id
                                            })
                                                .$observable
                                                .subscribe(istudent => {
                                                });
                                        } else if (this.data.userType === '2') {
                                            this.userService.studentCreate({
                                                userId: iuser.id
                                            })
                                                .$observable
                                                .subscribe(istudent => {
                                                });
                                        }
                                    });
                            }


                        }

                    });
            }
        }
    }

    cancel() {
        this.router.navigateByUrl(`pages/users/users-list`);
    }


}
