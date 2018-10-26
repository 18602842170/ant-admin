import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { GetUserBySessionIdService } from '../../../../shared/service/users/getUserBySession.service';
import { NullAstVisitor, ClassStmt } from '@angular/compiler';
import { ClassroomService } from '../../../../shared/service/classroom/classroom.service';
@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.less']
})
export class CourseAddComponent implements OnInit {
  gradeClassResult: any[] = [];
  presult: any[] = [];
  subjectResult: any[] = [];
  tearchersResult: any[] = [];
  classroomResult: any[] = [];
  fineoptions = [
    { value: true, label: '是' },
    { value: false, label: '否' },
  ];

  data = {
    id: null,
    gradeId: 0,
    subjectId: 0,
    userId: 0,
    classroomId: 0,
    name: null,
    gradeName: '',
    subjectName: '',
    classesNumber: null,
    payNumber: null,
    appointmentNumber: null,
    courseNumber: null,
    price: null,
    fine: null,
    backImageUrl: null,
    year: null,
    gradeClassId: null,


    nameError: false,
    gradeError: false,
    subjectError: false,
    courseError: false,
    payError: false,
    appointError: false,
    courseNumberError: false,
    classroomError: false,
    priceError: false,
    fineError: false,
    imageError: false,

    yearError: false,
    gradeClassError: false,

};
  constructor(
    private router: Router,
    private classroomService: ClassroomService,
    private courseService: CourseService,
    private modalService: NzModalService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.courseService.getGradeList({
      cd: 'CD00001',
    })
    .$observable
    .switchMap(grade => {
      this.presult = grade.results;
      this.courseService.getSubjectList({
        cd: 'CD00002',
      })
          .$observable
          .subscribe(result => {
            this.subjectResult = result.results.filter(f => {
              return f.id !== 0;
               });
               this.courseService.getTeachersList({}).$observable
               .subscribe( results => {
                this.tearchersResult = results.results.filter(f => {
                  return f.id !== 0;
                   });

            this.classroomService.query({}).$observable
               .subscribe( results1 => {
                this.classroomResult = results1.results.filter(f => {
                  return f.id !== 0;
                   });
                  });
               });

          });
          return this.activatedRoute.queryParamMap;
    })
    .map(params => params.get('id'))
    .subscribe(id => {
      if (id) {
        const ids = +id;
        this.courseService.getCourse(ids)
            .$observable
            .subscribe(result => {
              this.data.id = result.id;
              this.data.gradeId =  result.gradeId;
              this.data.subjectId = result.subjectId;
              this.data.name = result.name;
              this.data.classesNumber = result.classesNumber;
              this.data.payNumber = result.payNumber;
              this.data.appointmentNumber = result.appointmentNumber;
              this.data.courseNumber = result.courseNumber;
              this.data.price = result.price,
              this.data.classroomId = result.classroomId;
              this.data.fine = result.fine;
              this.data.backImageUrl = result.backImageUrl;
              this.data.subjectName = result.name.split('(')[0];
              this.data.gradeName = '(' + result.name.split('(')[1];
              this.data.year = result.year;
              if (result.year) {
                this.courseService.getGradeTotalList({
                  searchYear: +(result.year),
                }).$observable
                .subscribe(results => {
                  if (results) {
                    this.gradeClassResult = results.results;
                    this.data.gradeClassId = result.gradeClassId;
                  }
                });
              }
            });
      } else {
      }
    });
  }
  submit() {

    if (this.data.name === null ||  this.data.name.length === 0 || this.data.name === '') {

      this.data.nameError = true;

  } else if (this.data.gradeId === null || this.data.gradeId === 0) {

      this.data.nameError = false;
      this.data.gradeError = true;

  } else if (this.data.subjectId === null || this.data.subjectId === 0 ) {
      this.data.nameError = false;
      this.data.gradeError = false;
      this.data.subjectError = true;


  } else if (this.data.year === null || this.data.year.length === 0 || this.data.year === '') {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = true;

  } else if (this.data.gradeClassId === null || this.data.gradeClassId === 0) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = true;
  }   else if (this.data.classesNumber === null ||  this.data.classesNumber === '') {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
      this.data.courseError = true;

  } else if (this.data.payNumber === null || this.data.payNumber === '' ) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.courseError = false;
    this.data.gradeClassError = false;
    this.data.payError = true;

  } else if (this.data.appointmentNumber === null || this.data.appointmentNumber === '' ) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = true;

  } else if (this.data.courseNumber === null || this.data.courseNumber === '' ) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = true;

  } else if (this.data.price === null || this.data.price === ''  ) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = false;
    this.data.priceError = true;



  } else if (this.data.classroomId === null || this.data.classroomId === 0 ) {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = false;
    this.data.priceError = false;
    this.data.classroomError = true;


  }  else if (this.data.fine === null || this.data.fine === 0 ) {

    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = false;
    this.data.priceError = false;
    this.data.classroomError = false;
    this.data.fineError = true;

  } else if (this.data.backImageUrl === null || this.data.backImageUrl === '') {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = false;
    this.data.priceError = false;
    this.data.classroomError = false;
    this.data.fineError = false;
    this.data.imageError = true;

  } else {
    this.data.nameError = false;
    this.data.gradeError = false;
    this.data.subjectError = false;
    this.data.yearError = false;
    this.data.gradeClassError = false;
    this.data.courseError = false;
    this.data.payError = false;
    this.data.appointError = false;
    this.data.courseNumberError = false;
    this.data.priceError = false;
    this.data.classroomError = false;
    this.data.fineError = false;
    this.data.imageError = false;
    if (this.data.id) {
      this.courseService.courseUpdate ({
        id: +this.data.id,
        name: this.data.name,
        gradeId: this.data.gradeId,
        subjectId: this.data.subjectId,
        classesNumber: this.data.classesNumber,
        payNumber: this.data.payNumber,
        appointmentNumber: this.data.appointmentNumber,
        courseNumber: this.data.courseNumber,
        price: this.data.price,
        classroomId: +this.data.classroomId,
        fine: this.data.fine,
        backImageUrl: this.data.backImageUrl,
        year: this.data.year,
        gradeClassId: this.data.gradeClassId,
      })
        .$observable
        .subscribe(icourse => {

          this.courseService.courseAllotUpdate({
            courseId: icourse.id,
            userId: icourse.userId,
            userType: '1',

          }).$observable.subscribe(icourseAllot => { });
          this.router.navigateByUrl(`pages/course/course-list`);
          this.message.create('success', '编辑成功');

        });

    } else {


      this.courseService.courseCreate({

        name: this.data.name,
        gradeId: this.data.gradeId,
        subjectId: this.data.subjectId,
        classesNumber: this.data.classesNumber,
        payNumber: this.data.payNumber,
        appointmentNumber: this.data.appointmentNumber,
        courseNumber: this.data.courseNumber,
        price: this.data.price,
        fine: this.data.fine,
        classroomId: +this.data.classroomId,
        backImageUrl: this.data.backImageUrl,
        year: this.data.year,
        gradeClassId: this.data.gradeClassId,
      }).$observable
      .subscribe(icourse => {

        this.courseService.courseAllotCreate({
          courseId: icourse.id,
          userId: icourse.userId,
          userType: '1',
        }).$observable.subscribe(icourseAllot => { });


        this.router.navigateByUrl(`pages/course/course-list`);
        this.message.create('success', '操作成功');
        }
      );
    }
  }
  }

  cancel() {
    this.router.navigateByUrl(`pages/course/course-list`);
}

changeName(event) {
  this.courseService.getSingleSubjectList(+event)
  .$observable
  .subscribe(result => {
      if (result) {
        if (result.cd === 'CD00001') {
        this.data.gradeName = '(' + result.tpName + ')';
          } else if (result.cd === 'CD00002') {
            this.data.subjectName = result.tpName;
          }
          this.data.name = this.data.subjectName  + this.data.gradeName ;
        }
      });
  }

  changeGradeClass(event) {
    if (event) {
      this.courseService.getGradeTotalList({
        searchYear: +(event.getFullYear()),
      }).$observable
      .subscribe(result => {
        if (result) {
          this.data.gradeClassId = null;
          this.gradeClassResult = result.results;
        }
      });
    } else {
      this.data.gradeClassId = null;
      this.gradeClassResult = null;

    }
  }
}
