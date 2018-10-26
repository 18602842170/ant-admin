import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../shared/service/auth-guard.service';
import { ManagerCanActivate } from '../shared/service/manager-can-activate.service';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'form',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './form/form.module#FormModule'
      },
      {
        path: 'profile',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
        path: 'result',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './result/result.module#ResultModule'
      },
      {
        path: 'list',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './list/list.module#ListModule'
      },
      {
        path: 'exception',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './exception/exception.module#ExceptionModule'
      },
      {
        path: 'style',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './style/style.module#StyleModule'
      },
      {
        path: 'users',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './users/users.module#UsersModule'
      },
      // 教师管理
      {
        path: 'teacher',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './teacher/teacher.module#TeacherModule'
      },
      // 学员管理
      {
        path: 'student',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './student/student.module#StudentModule'
      },

      // 课程管理
      {
        path: 'course',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './course/course.module#CourseModule'
      },
      // 通知管理
      {
        path: 'notice',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './notice/notice.module#NoticeModule'
      },
      // 教室管理
      {
        path: 'classroom',
        canActivate: [AuthGuard, ManagerCanActivate],
        loadChildren: './classroom/classroom.module#ClassroomModule'
      }

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
