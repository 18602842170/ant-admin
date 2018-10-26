
// 这个Service是写在page下的teacher模块下的，可以理解为社内系统中自己写的service，例如rp0101Service
// 这个Service是提供给teacher模块下所有子模块用的
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BASE_URL } from '../../shared/service/const';
import { NoticeService, INotice, INoticeQuery } from '../../shared/service/notice/notice.service';
import { CourseAllotService, ICourseAllotQuery } from '../../shared/service/courseAllot/courseAllot.service';

@Injectable()
export class NoticePageService {
    options: any;
    headers: Headers;
    constructor(
        // 这里构造函数，可以理解为引入了TeacherService，TeacherService在shared中
        private noticeService: NoticeService,
        private courseAllotService: CourseAllotService,
    ) {
    }
    // getUser(id: number) {
    //     return this.teacherService.get({ id });
    // }

    // 一个名叫getTeacherList的查询方法，传入的是ITeacherQuery类型的查询条件，这个查询条件在shared下的TeacherService中有详细说明

    getNotice(id: number) {
        return this.noticeService.get({ id });
    }

    getNoticeList(noticeQuery?: INoticeQuery) {
        return this.noticeService.query(noticeQuery);
    }

    noticeCreate(notice: INotice) {
        return this.noticeService.create(notice);
    }

    noticeUpdate(notice: INotice) {
        return this.noticeService.update(notice);
    }

    noticeDelete(id: number) {
         return this.noticeService.remove({ id });
    }

    getAllotList(courseAllotQuery?: ICourseAllotQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.courseAllotService.query(courseAllotQuery);
    }
}
