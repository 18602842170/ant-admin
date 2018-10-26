import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { UserService } from '../../../users/user.service';
import { TeacherModule } from '../../../teacher/teacher.module';
import { Observable } from 'rxjs/Observable';
import { IUsers } from '../../../../shared/service/users/getUserBySession.service';
import { StudentService } from '../../../../shared/service/student/student.service';
import { CourseAllotService } from '../../../../shared/service/courseAllot/courseAllot.service';
import { CourseAllotsService } from './courseallot.service';

@Component({
  selector: 'app-course-signup',
  templateUrl: './course-signup.component.html',
  styleUrls: ['./course-signup.component.less']
})
export class CourseSignupComponent implements OnInit {
  iuser: IUsers;
  data = {
    courseId: null,
    userId: null,
    phone: '',
    name: '',
    sex: '',
    ischarge: null,
    phoneError: false,
    chargeError: false,
    userError: false,
    userRegisterError: false,
    payNumber: 0,
};

heroes$: Observable<IUsers[]>;
private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private courseService: CourseService,
    private courseAllotsService: CourseAllotsService,
    private studentservice: StudentService,
    private userService: UserService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  searchIsExist(event): void {

    this.data.phone = event.target.value;
    this.searchTerms.next(this.data.phone);

    // tslint:disable-next-line:no-non-null-assertion
    if (this.data.phone !== null && this.data.phone.length > 0 && this.data.phone !== '') {

      this.userService.getUsersList({


        phoneNumber : this.data.phone

      }).$observable
      .switchMap(result => {

        if (result.results != null && result.results.length > 0) {
          this.iuser = result.results[0];
          this.data.name = result.results[0].nikeName;
          this.data.userId = this.iuser.id;
          this.data.userError = false;


          this.courseAllotsService.getCoursesList({
            courseId: this.data.courseId,
            userId: this.data.userId,
            }).$observable.subscribe(iCourseAllot => {
              if (iCourseAllot.results != null && iCourseAllot.results.length > 0) {

                 this.data.userRegisterError = true;
                 this.data.name = '';
                 this.data.sex = '';
                 this.data.ischarge = null;
                 this.data.userId = null;
              } else {
                this.data.userRegisterError = false;

              }

            });


        } else {
          this.data.userRegisterError = false;
          this.data.userError = true;
          this.data.name = '';
          this.data.sex = '';
          this.data.ischarge = null;
          this.data.userId = null;
        }
        return result.results;
      }).subscribe(result => {

        this.studentservice.query({

          userId:  this.data.userId,

        }).$observable.subscribe(istudent => {
          if (istudent.results) {

            this.data.sex = istudent.results[0].studentSex;
          }

        });



      });
    } else {
      this.data.name = '';
      this.data.sex = '';
      this.data.ischarge = null;
      this.data.userId = null;

    }
   }
  ngOnInit(): void {
    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    this.data.courseId = searchParams.get('id');
    console.log(this.data.courseId );
    this.searchTerms
    .debounceTime(300)
    .distinctUntilChanged()
    .switchMap(term => this.userService.getUserByPhone(term));
  }



  submit() {

   if (this.data.phone !== null && this.data.phone.length > 0 && this.data.phone !== '') {

      this.userService.getUsersList({


        phoneNumber : this.data.phone

      }).$observable
      .switchMap(result => {
        if (result.results != null && result.results.length > 0) {
          if (this.data.phone === null ||  this.data.phone === '') {

            this.data.phoneError = true;

          } else if (this.data.ischarge === null || this.data.ischarge === '') {
          this.data.phoneError = false;
          this.data.chargeError = true;

        } else {

          this.data.phoneError = false;
          this.data.chargeError = false;

          this.courseAllotsService.getCoursesList({
            courseId: this.data.courseId,
            userId: this.data.userId,
            }).$observable.subscribe(iCourseAllot => {
              if (iCourseAllot.results != null && iCourseAllot.results.length > 0) {

                 this.data.userRegisterError = true;
                 this.data.name = '';
                 this.data.sex = '';
                 this.data.ischarge = null;
                 this.data.userId = null;
              } else {
                this.data.userRegisterError = false;
                this.courseService.courseAllotCreate({
                  courseId: this.data.courseId,
                  userId:  this.data.userId,
                  userType: '2',
                  isCharge: this.data.ischarge,
                }).$observable.subscribe(icourseAllot => {

                  if ( this.data.ischarge) {
                  this.courseService.getCourse(this.data.courseId).$observable.subscribe(icourse => {
                    this.data.payNumber = ( icourse.payNumber == null ? 0 : icourse.payNumber) + 1 ;
                   this.courseService.courseUpdate({
                    id: this.data.courseId,
                    payNumber: this.data.payNumber,
                   }).$observable.subscribe(icourse02 => {
                    this.router.navigateByUrl(`pages/course/course-signup-list?id=${this.data.courseId}`);
                    this.message.create('success', '报名成功');
                   });
                  });
                } else {
                  this.router.navigateByUrl(`pages/course/course-signup-list?id=${this.data.courseId}`);
                  this.message.create('success', '报名成功');
                }
                });
              }
            });
        }
        } else {

          this.data.userError = true;
          this.data.name = '';
          this.data.sex = '';
          this.data.ischarge = null;
          this.data.userId = null;
        }
        return result.results;
      }).subscribe(result => {
      });
    } else {


      if (this.data.phone === null ||  this.data.phone === '') {

        this.data.phoneError = true;

      } else if (this.data.ischarge === null || this.data.ischarge === '') {
      this.data.phoneError = false;
      this.data.chargeError = true;

    }


    }
  }
  cancel() {

    this.router.navigateByUrl(`pages/course/course-signup-list?id=${this.data.courseId}`);

  }
  gotoRegister() {

    this.router.navigateByUrl(`pages/users/users-add`);


  }

}
