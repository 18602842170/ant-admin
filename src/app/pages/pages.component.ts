import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { MenuItem } from '../shared/militar-libs/components/menu/menu.component';
import { LoginService } from '../shared/service/login.service';
import { ALL_PAGE_OBJ } from '../shared/service/page-const';
import { IUsers } from '../shared/service/users/users.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
  menu: MenuItem[] = [];

  isCollapsed = false;

  pageReady = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
  }

  viewflag = false;
  user: IUsers;
  ngOnInit() {
    this.loginService.getUser()
      .subscribe(user => {
        this.user = user;
        this.getPage();
      });
  }
  loginOut() {
    this.loginService.logout()
      .subscribe(msg => {
        if (msg === 'success') {
          window.location.href = '/';
        }
      });
  }
  changeCollapsed() {
    this.isCollapsed = !this.isCollapsed;
    window.dispatchEvent(new Event('resize'));
  }

  // 生成页面
  getPage() {
    // 分别获取每个页面
    for (const lmenu of ALL_PAGE_OBJ.users.children) {
      if (this.user.permissionMap[lmenu.path]) {
        this.setChildren(ALL_PAGE_OBJ.users, lmenu);
      }
    }
    // 获取教师管理页面
    for (const lmenu of ALL_PAGE_OBJ.teacher.children) {
      this.setChildren(ALL_PAGE_OBJ.teacher, lmenu);
      if (this.user.permissionMap[lmenu.path]) {
      }
    }
    // 获取学员管理页面
    for (const lmenu of ALL_PAGE_OBJ.student.children) {
       this.setChildren(ALL_PAGE_OBJ.student, lmenu);
      if (this.user.permissionMap[lmenu.path]) {
      }
    }
    // 获取课程管理页面
    for (const lmenu of ALL_PAGE_OBJ.course.children) {
      this.setChildren(ALL_PAGE_OBJ.course, lmenu);
      if (this.user.permissionMap[lmenu.path]) {
      }
    }
    // 获取通知管理页面
    for (const lmenu of ALL_PAGE_OBJ.notice.children) {
        this.setChildren(ALL_PAGE_OBJ.notice, lmenu);
        if (this.user.permissionMap[lmenu.path]) {
      }
    }
    // 获取教室管理页面
    for (const lmenu of ALL_PAGE_OBJ.classroom.children) {
          this.setChildren(ALL_PAGE_OBJ.classroom, lmenu);
          if (this.user.permissionMap[lmenu.path]) {
        }
    }

    // for (const lmenu of ALL_PAGE_OBJ.dashboard.children) {
    //   this.setChildren(ALL_PAGE_OBJ.dashboard, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.exception.children) {
    //   this.setChildren(ALL_PAGE_OBJ.exception, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.form.children) {
    //   this.setChildren(ALL_PAGE_OBJ.form, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.list.children) {
    //   this.setChildren(ALL_PAGE_OBJ.list, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.profile.children) {
    //   this.setChildren(ALL_PAGE_OBJ.profile, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.result.children) {
    //   this.setChildren(ALL_PAGE_OBJ.result, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    // for (const lmenu of ALL_PAGE_OBJ.style.children) {
    //   this.setChildren(ALL_PAGE_OBJ.style, lmenu);
    //   if (this.user.permissionMap[lmenu.path]) {
    //   }
    // }
    this.pageReady = true;
  }

  setChildren(page, lmenu) {
    if (this.menu.filter(m => m.path === page.path).length > 0) {
      this.menu.filter(m => m.path === page.path)[0].children.push(lmenu);
    } else {
      this.menu.push({
        path: page.path,
        data: page.data,
        children: [lmenu]
      });
    }

  }
}
