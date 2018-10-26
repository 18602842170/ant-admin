import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { BASE_URL } from '../../shared/service/const';
import { CoursesService, ICourseQuery, ICourse, ICourseClass } from '../../shared/service/course/courses.service';
import { RollCallService, IRollCallQuery } from '../../shared/service/rollCall/rollCall.service';
import { StudentService, IStudentQuery } from '../../shared/service/student/student.service';
import { DistinctSubscriber } from 'rxjs/operators/distinct';
import { DistinguishService, IDistinguishQuery, IDistinguish } from '../../shared/service/distinguish/distinguish.service';
import { TeacherService } from '../../shared/service/teacher/teacher.service';
import { CourseAllotService, ICourseAllot } from '../../shared/service/courseAllot/courseAllot.service';
import { ICourseDetailQuery, CourseDetailService } from '../../shared/service/coursedetail/coursedetail.service';
import { ICoursereserve, CoursereserveService, ICoursereserveQuery } from '../../shared/service/course/coursereserve.service';
import { GradeService, IGrade, IGradeQuery } from '../../shared/service/grade/grade.service';
import { CoursetableService, ICoursetableQuery } from '../../shared/service/course/coursetable.service';

@Injectable()
export class CourseService {
    options: any;
    headers: Headers;
    constructor(
        private tearchService: TeacherService,
        private distinguishService: DistinguishService,
        private coursesService: CoursesService,
        private courseAllotService: CourseAllotService,
        private rollCallService: RollCallService,
        private courseDetailService: CourseDetailService,
        private coursereserveService: CoursereserveService,
        private studentService: StudentService,
        private gradeService: GradeService,
        private coursetableService: CoursetableService,
        private http: Http

    ) {
    }
    getCoursesList(courseQuery?: ICourseQuery) {
        return this.coursesService.query(courseQuery);
    }
    getGradeList(distinguishQuery?: IDistinguishQuery) {

        return this.distinguishService.query(distinguishQuery);


    }
    getCourse(id: number) {
        return this.coursesService.getUser({ id });
    }

    getSubjectList(distinguishQuery?: IDistinguishQuery) {

        return this.distinguishService.query(distinguishQuery);
    }
    subjectDelete(id: number) {
        return this.distinguishService.remove({ id });
    }
    subjectCreate(distinguish: IDistinguish) {
        return this.distinguishService.create(distinguish);
    }
    getSubject(id: number) {
        return this.distinguishService.get({ id });
    }
    subjectUpdate(distinguish: IDistinguish) {
        return this.distinguishService.update(distinguish);
    }



    getSingleSubjectList(id: number) {

        return this.distinguishService.get({ id });


    }
    getTeachersList(courseQuery?: ICourseQuery) {
        return this.tearchService.query();

    }
    courseCreate(course: ICourse) {
        return this.coursesService.create(course);
    }

    courseUpdate(course: ICourse) {
        return this.coursesService.update(course);
    }

    courseClassCreate(courseClass: ICourseClass) {

        return this.coursesService.createClass(courseClass);
    }
    getRollCallList(rollCallQuery?: IRollCallQuery) {
        return this.rollCallService.query(rollCallQuery);
    }

    courseAllotCreate(courseAllot: ICourseAllot) {

        return this.courseAllotService.create(courseAllot);

    }

    courseAllotUpdate(courseAllot: ICourseAllot) {

        return this.courseAllotService.updateCourseAllot(courseAllot);

    }
    getStudentList(studentQuery?: IStudentQuery) {
        //  getTeacherList方法中调用构造函数中TeacherService下的query方法
        return this.studentService.query(studentQuery);
    }

    getCourseDetailList(courseQuery?: ICourseDetailQuery) {
        return this.courseDetailService.query(courseQuery);
    }

    courseDelete(id: number) {
        return this.coursesService.remove({ id });
    }
    removeCourseDetail(id: number) {
        return this.courseDetailService.remove({ id });
    }

    getCoursereserveList(parama?: ICoursereserveQuery) {
        return this.coursereserveService.query(parama);
    }


    getGradeTotalList(gradeQuery?: IGradeQuery) {

        return this.gradeService.query(gradeQuery);
    }
    gradeDelete(id: number) {
        return this.gradeService.remove({ id });
    }
    gradeCreate(grade: IGrade) {
        return this.gradeService.create(grade);
    }
    getGrade(id: number) {
        return this.gradeService.get({ id });
    }
    gradeUpdate(grade: IGrade) {
        return this.gradeService.update(grade);
    }

    getCoursesTableList(courseQuery?: ICoursetableQuery) {
        return this.coursetableService.query(courseQuery);
    }
}
