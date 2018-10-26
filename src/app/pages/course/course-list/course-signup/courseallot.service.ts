import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { CourseAllotService, ICourseAllotQuery, ICourseAllot} from '../../../../shared/service/courseAllot/courseAllot.service';


@Injectable()
export class CourseAllotsService {
    options: any;
    headers: Headers;
    constructor(
        private courseAllotService: CourseAllotService,
        private http: Http

    ) {
    }
    getCoursesList(courseAllotQuery?: ICourseAllotQuery) {
        return this.courseAllotService.query(courseAllotQuery);
    }
}
