import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { IUsersQuery, IUsers } from '../../../shared/service/users/users.service';
import { QueryResults } from '../../../shared/service/interface';
import { RoleService } from '../../../shared/service/users/role.service';
import { UserService } from '../user.service';
import { GetUserBySessionIdService } from '../../../shared/service/users/getUserBySession.service';
@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.less']
})
export class UsersListComponent implements OnInit {
    iusers: IUsers[] = [];
    result: any[] = [];
    presult: any[] = [];
    deptResult: any[] = [];
    _displayData: Array<any> = [];
    pageCon = {
        page: 1,
        count: 0,
        offset: 0,
        pageSize: 5,
        name: '',
        roleId: 0,
        deptId: 0
    };
    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private userService: UserService,
        private getUserBySessionIdService: GetUserBySessionIdService,
        private router: Router
    ) { }
    ngOnInit() {

        this.userService.getRolesList({})
            .$observable
            .subscribe(roles => {
                // roles.results.push({ id: null, name: '' });
                this.presult = roles.results;
                this.userService.getDepartmentList({}).$observable.subscribe(result => {
                    this.deptResult = result.results.filter(f => {
                        return f.pId !== 0;
                    });
                });
            });
        // this.result = transferToObject(this.test, 'name', 'namevalue');
    }

    _displayDataChange($event) {
        this._displayData = $event;
    }

    add() {
        // const activeModal = this.modalService.open({
        //     title: '新建', content: UsersAddComponent,
        // });
        // // 设置模态框的状态;
        // // activeModal.componentInstance.modalStatus = 'create';
        // // 设置关闭方法
        // activeModal.subscribe(result => {
        //     console.log(result);
        // });
    }

    search() {

        this.pageCon.page = 1;
        this.loadStaffList();
    }

    changePage(event) {

        this.pageCon.page = +event;

        // this.pageCon.offset = this.pageCon.pageSize * (this.pageCon.page - 1);

        this.loadStaffList();
    }

    loadStaffList() {
        this.userService.getUsersList({
            pageSize: this.pageCon.pageSize,
            pageNum: this.pageCon.page,
            name: this.pageCon.name,
            roleId: +this.pageCon.roleId === 0 ? null : this.pageCon.roleId,
            deptId: +this.pageCon.deptId === 0 ? null : this.pageCon.deptId,

        })
            .$observable
            .subscribe(queryResults => {
                if (queryResults.results) {
                    this.iusers = queryResults.results;

                    for (let i = 0; i < queryResults.results.length; i++) {
                        if (queryResults.results[i].userType === '1') {

                            // 教师
                            queryResults.results[i].isTearch = true;


                        } else if (queryResults.results[i].userType === '2') {

                            // 学员
                            queryResults.results[i].isStudent = true;

                        }


                    }
                    this.pageCon.count = queryResults.count;
                } else {
                    this.pageCon.count = 0;
                }
            });

    }

    edit(id: number) {
        this.router.navigateByUrl(`/pages/users/users-add?id=${id}`);
    }



    delete(id: number) {
        this.userService.usersDelete(id).$observable
            .subscribe(queryResults => {
                if (queryResults.name) {
                    this.message.create('success', '操作成功');
                    this.loadStaffList();
                }
            });
    }

    resetPassword(id: number) {
        this.userService.usersUpdate({
            id: id,
            password: '123456',
        }).$observable
        .subscribe(iuser => {
            this.loadStaffList();
            this.message.create('success', '密码重置成功');
        });


    }

    reset() {
        this.pageCon.name = '';
        this.pageCon.roleId = 0;
        this.pageCon.deptId = 0;
        this.loadStaffList();
    }

    creat() {
        this.router.navigateByUrl(`/pages/users/users-add`);
    }

    sendVerifyCode(id: number) {
        this.getUserBySessionIdService.sendCode({ id }).$observable
            .subscribe(queryResults => {
                if (queryResults.id) {
                    this.message.create('success', '发送成功');
                    this.loadStaffList();
                }
            });
    }

    transferToTearchDetail(id: number) {

        this.router.navigateByUrl(`/pages/teacher/teacher-edit?id=${id}&fromuserpage=yes`);

    }

    transferToStudentDetail(id: number) {

        this.router.navigateByUrl(`/pages/student/student-edit?id=${id}&fromuserpage=yes`);

    }
    cancel = function () {
        this.message.info('取消操作');
      };

      confirm = (id: number) => {
        this.userService.usersDelete(id).$observable
        .subscribe(queryResults => {
            if (queryResults.name) {
                this.message.create('success', '操作成功');
                this.loadStaffList();
            }
        });
      }

}
