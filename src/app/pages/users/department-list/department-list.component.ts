import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { NzModalService, NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { QueryResults } from '../../../shared/service/interface';
import { RoleService, IRole } from '../../../shared/service/users/role.service';
import { TreeModel, NodeEvent, Ng2TreeSettings, RenamableNode } from 'ng2-tree';
import { DepartmentService, IDepartment } from '../../../shared/service/users/department.service';
import { UserService } from '../user.service';
import index from 'viser';

declare const alertify: any;
@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.less']
})
export class DepartmentListComponent implements OnInit {
    dept: IDepartment = {};
    department: IDepartment = {};
    oldName: '';
    flg = 'default';
    selectFlg;
    node: NodeEvent;
    result: IDepartment[] = [];
    presult: IDepartment[] = [];
    _displayData: Array<any> = [];
    public settings: Ng2TreeSettings = {
        rootIsVisible: false
    };
    fonts: TreeModel;
    selectedValue = '1';
    constructor(
        private modalService: NzModalService,
        private message: NzMessageService,
        private userService: UserService,
        private router: Router,
    ) { }
    ngOnInit() {
        this.node = null;
        this.search();
        // this.result = transferToObject(this.test, 'name', 'namevalue');
    }

    search() {
        this.dept.childDeptName = '';
        this.userService.getDepartmentList()
            .$observable
            .switchMap(searchResult => {
                this.presult = searchResult.results;
                return this.userService.getDepartmentList({ pId: 0 })
                    .$observable;
            })
            .subscribe(pre => {
                if (pre.results.length) {

                    this.department = pre.results[0];
                    this.fonts = {
                        value: {
                            ...this.department,
                            name: this.department.deptName,
                            setName(name: string): void {
                                this.name = name;
                            },
                            toString(): string {
                                return this.name;
                            }
                        } as RenamableNode,
                        loadChildren: (callback) => {
                            this.getChildren(this.department.id, callback);
                        }
                    };
                }
            });
    }

    // tslint:disable-next-line:member-ordering
    private static logEvent(e: NodeEvent, message: string): void {
        console.log(e);
    }

    getChildren(pid: number, callback) {
        this.userService.getDepartmentList({ pId: pid })
            .$observable
            .subscribe(searchResult => {
                const children = [];
                if (searchResult.results.length > 0) {
                    for (const child of searchResult.results) {
                        children.push({
                            value: {
                                ...child,
                                name: child.deptName,
                                setName(name: string): void {
                                    this.name = name;
                                },
                                toString(): string {
                                    return this.name;
                                }
                            } as RenamableNode,
                            loadChildren: (callbackfn) => {
                                this.getChildren(child.id, callbackfn);
                            }
                        });
                    }
                }
                callback(children);
            });


    }

    _displayDataChange($event) {
        this._displayData = $event;
    }

    // delete(id) {
    //     this.roleService.remove({ id }).$observable
    //         .subscribe(queryResults => {
    //             if (queryResults.name) {
    //             }
    //         });
    // }

    public onNodeSelected(e: NodeEvent): void {
        // this.presult = this.result.filter(p => {
        //     return p.id !== this.dept.id;
        // });
        this.selectFlg = 'select';
        this.flg = 'default';
        this.node = e;
        this.clear();
    }

    creat() {
        this.flg = 'creat';
        this.clear();
        if (this.selectFlg) {
            // 新建子节点界面
            // this.dept.deptName = this.node.node.node.value['deptName'];
            // this.dept.id = this.node.node.node.value['id'];
            this.dept.pId = this.node.node.node.value['id'];
        } else {
            this.clear();
        }
    }

    edit() {
        this.flg = 'edit';
        if (this.selectFlg) {
            // 编辑部门界面
            this.dept.deptName = this.node.node.node.value['deptName'];
            this.dept.id = this.node.node.node.value['id'];
            this.dept.pId = this.node.node.node.value['pId'];
            this.oldName = this.node.node.node.value['deptName'];
        } else {
            this.message.create('warning', '请选择要编辑的部门');
        }
    }

    save() {
        if ((this.flg === 'default' || this.flg === 'creat') && this.selectFlg !== 'select') {
            // 默认新建
            this.userService.departmentCreate(this.dept)
                .$observable
                .subscribe(iuser => {
                    if (iuser) {
                        this.message.create('success', '操作成功');
                        this.search();
                        this.clear();
                    }
                });
        }
        if (this.flg === 'creat' && this.selectFlg === 'select') {
            // 新建子部门
            this.dept.id = null;
            this.userService.departmentCreate(this.dept)
                .$observable
                .subscribe(iuser => {
                    if (iuser) {
                        this.message.create('success', '操作成功');
                        this.search();
                        this.clear();
                    }
                });
        }
        if (this.flg === 'edit' && this.selectFlg === 'select') {
            // 编辑
            this.userService.departmentUpdate(this.dept)
                .$observable
                .subscribe(iuser => {
                    if (iuser) {
                        this.message.create('success', '操作成功');
                        this.search();
                        this.clear();
                    }
                });
        }
    }

    cancel(): void {
        // this.message.info('click cancel');
    }

    confirm(): void {
        if (this.dept.id) {
            const id = this.dept.id;
            this.userService.departmentDelete(id).$observable
                .subscribe(queryResults => {
                    if (queryResults) {
                        this.message.create('success', '操作成功');
                        this.search();
                        this.clear();
                        this.flg = 'default';
                        this.selectFlg = null;
                    }
                });
        } else {
            this.message.create('warning', '请选择要删除的部门');
        }
    }

    clear() {
        this.dept.id = null;
        this.dept.deptName = '';
        this.dept.pId = null;
        this.oldName = '';
    }

}
