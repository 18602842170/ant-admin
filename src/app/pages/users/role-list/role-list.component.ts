import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { UsersService, IUsersQuery, IUsers } from '../../../shared/service/users/users.service';
import { QueryResults } from '../../../shared/service/interface';
import { RoleService, IRole } from '../../../shared/service/users/role.service';
import { UserService } from '../user.service';
@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.less']
})
export class RoleListComponent implements OnInit {
    iroles: IRole[] = [];
    result: any[] = [];
    presult: any[] = [];
    _displayData: Array<any> = [];
    pageCon = {
        page: 1,
        count: 0,
        offset: 0,
        pageSize: 5,
        name: '',
    };
    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private userService: UserService,
        private roleService: RoleService,
        private router: Router
    ) { }
    ngOnInit() {


        // this.result = transferToObject(this.test, 'name', 'namevalue');
    }

    _displayDataChange($event) {
        this._displayData = $event;
    }

    search() {
        this.loadStaffList();
    }

    changePage(event) {

        this.pageCon.page = +event;

        // this.pageCon.offset = this.pageCon.pageSize * (this.pageCon.page - 1);

        this.loadStaffList();
    }

    loadStaffList() {
        this.userService.getRolesList({
            pageSize: this.pageCon.pageSize,
            pageNum: this.pageCon.page,
            name: this.pageCon.name
        })
            .$observable
            .subscribe(queryResults => {
                if (queryResults.results) {
                    this.iroles = queryResults.results;
                    this.pageCon.count = queryResults.count;
                } else {
                    this.pageCon.count = 0;
                }
            });

    }

    edit(id: number) {
        this.router.navigateByUrl(`/pages/users/role-add?id=${id}`);
    }

    // delete(id) {
    //     this.usersService.remove({ id }).$observable
    //         .subscribe(queryResults => {
    //             if (queryResults.name) {
    //                 this.loadStaffList();
    //             }
    //         });
    // }

    reset() {
        this.pageCon.name = '';
        this.loadStaffList();
    }

    delete(id) {
        this.roleService.remove({ id }).$observable
            .subscribe(queryResults => {
                if (queryResults.name) {
                    this.message.create('success', '操作成功');
                    this.loadStaffList();
                }
            });
    }

    creat() {
        this.router.navigateByUrl(`/pages/users/role-add`);
    }

}
