import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '../../../course.service';

@Component({
  selector: 'app-arranging-detail',
  templateUrl: './arranging-detail.component.html',
  styleUrls: ['./arranging-detail.component.less']
})
export class ArrangingDetailComponent implements OnInit {

  currentCourseOfDetailList: any[] = [];
  tearchersResult: any[] = [];
  changeNumber = 0;
  data = {
    id: null,
    userId: null,
    isRepeat: '',
    startTime: null,
    endTime: null,
    courseDate: null,
    startHours: '',
    startMinutes: '',
    endHours: '',
    endMinutes: '',
    courseNumber: null,
    startTimeError: false,
    endTimeError: false,
    repeatError: false,
    timeChooseEror: false,
    teacherError: false,
    courseNumberError: false,
    courseDateError: false,
    courseNumBigError: false,
    courseNumberAll: 0,
    courseNumberCan: 0,
  };

  day = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  };
  // tslint:disable-next-line:max-line-length
  dayArray:  string[] = [];

  constructor(
    private message: NzMessageService,
    private router: Router,
    private courseService: CourseService,
  ) { }

  ngOnInit() {

    const addressUrl = location.search.slice(1);
    const searchParams = new URLSearchParams(addressUrl);
    this.data.id = searchParams.get('id');
    this.data.courseDate =  searchParams.get('date');
    this.data.courseNumberAll = Number(searchParams.get('courseNumber'));

    this.courseService.getTeachersList({})
              .$observable
               .subscribe(results => {
                this.tearchersResult = results.results.filter(f => {
                  return f.id !== 0;
                   });
              // this.courseService.getCourseDetailList({
              //   courseId: this.data.
              // })
              // .$observable
              //  .subscribe(results1 => {
              //   });
               });


  }
  cancel () {
    this.router.navigateByUrl(`pages/course/course-list`);
  }
  isRepeat(event) {
    if (event === '2') {
      this.data.courseNumber = 1;


    }

  }
  submit() {
        if ( this.data.startTime === null || this.data.startTime === '' || this.data.startTime.length === 0 ) {

            this.data.startTimeError = true;
        } else if (this.data.endTime === null || this.data.endTime === '' || this.data.endTime.length === 0) {
          this.data.startTimeError = false;
            this.data.endTimeError = true;

        } else if (this.data.isRepeat === null || this.data.isRepeat === '' ) {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
            this.data.repeatError = true;

        } else if (this.data.isRepeat === '1' &&  this.changeNumber === 0) {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
          this.data.repeatError = false;

          this.data.timeChooseEror = true;
        } else if (this.data.userId === null ||  this.data.userId === 0) {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
          this.data.repeatError = false;
          this.data.timeChooseEror = false;
          this.data.teacherError = true;
        } else if (this.data.courseNumber === null ||  this.data.courseNumber === '') {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
          this.data.repeatError = false;
          this.data.timeChooseEror = false;
          this.data.teacherError = false;
          this.data.courseNumberError = true;
        } else if (this.data.courseDate === null ||  this.data.courseDate === '') {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
          this.data.repeatError = false;
          this.data.timeChooseEror = false;
          this.data.teacherError = false;
          this.data.courseNumberError = false;
          this.data.courseDateError = true;
        } else {
          this.data.startTimeError = false;
          this.data.endTimeError = false;
          this.data.repeatError = false;
          this.data.timeChooseEror = false;
          this.data.teacherError = false;
          this.data.courseNumberError = false;
          this.data.courseDateError = false;
          this.courseService.getCourseDetailList({
            courseId: this.data.id
          }) .$observable
          .subscribe(result => {
            if (result) {
              this.data.courseNumberCan = this.data.courseNumberAll - result.results.length;
              if (this.data.courseNumber > this.data.courseNumberAll - result.results.length) {
                this.data.courseNumBigError = true;
              } else {
                this.data.courseNumBigError = false;
                // tslint:disable-next-line:max-line-length
                this.dayArray = ['0:' + this.day.Sunday, '1:' + this.day.Monday, '2:' + this.day.Tuesday, '3:' + this.day.Wednesday, '4:' + this.day.Thursday, '5:' + this.day.Friday, '6:' + this.day.Saturday];
                if (this.data.startTime.getHours().toString().length === 1) {

                    this.data.startHours = '0' + this.data.startTime.getHours();
                  } else {
                    this.data.startHours = this.data.startTime.getHours();
                }
                if (this.data.startTime.getMinutes().toString().length === 1) {

                  this.data.startMinutes = '0' + this.data.startTime.getMinutes();
                } else {
                  this.data.startMinutes = this.data.startTime.getMinutes();
              }


                if (this.data.endTime.getHours().toString().length === 1) {

                  this.data.endHours = '0' + this.data.endTime.getHours();
                } else {
                  this.data.endHours = this.data.endTime.getHours();
              }

              if (this.data.endTime.getMinutes().toString().length === 1) {

                this.data.endMinutes = '0' + this.data.endTime.getMinutes();
              } else {
                this.data.endMinutes = this.data.endTime.getMinutes();
              }
                this.courseService.courseClassCreate({
                  courseId: +this.data.id,
                  courseDay: this.data.courseDate,
                  isRepeat: this.data.isRepeat,
                  startTime: this.data.startHours + ':' +  this.data.startMinutes,
                  endTime: this.data.endHours + ':' + this.data.endMinutes,
                  dayArray: this.dayArray,
                  courseNumber: this.data.courseNumber,
                  userId: +this.data.userId,
                }).$observable
                .subscribe(icourse => {
                  this.router.navigateByUrl(`pages/course/course-list`);
                  this.message.create('success', '操作成功');
                  }
                );
              }
            }
          });
      }
  }

  _console(event) {
   if ( event === true) {

    this.changeNumber = this.changeNumber + 1;


    }

    if (event === false) {

      this.changeNumber = this.changeNumber - 1;

    }
  }
}
