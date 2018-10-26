import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CourseDetailService, ICourseDetail, ICourseDetailQuery } from '../../../../../shared/service/coursedetail/coursedetail.service';

@Injectable()
export class CourseDetailsService {
    options: any;
    headers: Headers;
    constructor(
        private courseDetailService: CourseDetailService,
        private http: Http

    ) {
    }
    deleteByDate(courseDetail?: ICourseDetail) {

        return this.courseDetailService.removeByDate(courseDetail);

    }
}



