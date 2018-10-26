import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../shared/service/login.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { TOKEN_NAME } from '../../shared/service/const';
import { AuthService } from '../../shared/service/auth.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  validateForm2: FormGroup;
  validateForm3: FormGroup;
  contr: FormControl;
  loginFlag = true;
  repeatFlg = false;
  pageReady = false;
  nameStream = new Subject<string>();

  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _notification: NzNotificationService,
    private authService: AuthService,
  ) {
  }
  // 账号密码登录
  _submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.value.userName && this.validateForm.value.password) {
      this.loginService.login(this.validateForm.value.userName, this.validateForm.value.password)
        .subscribe(msg => {
          if (msg === 'success') {
            this._notification.create('success', '成功', '登录成功');
            this.router.navigateByUrl(`/pages/dashboard;`);
          }
          if (msg === 'passwordError') {
            this._notification.create('error', '失败', '账号或密码错误，请重试');
          }
          if (msg === 'nameError') {
            this._notification.create('error', '失败', '账号或密码错误，请重试');
          }
          if (msg === 'userDelete') {
            this._notification.create('error', '失败', '账号不存在，请重试');
          }
        });
    }
  }
  _submitForm2() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm2.controls) {
      this.validateForm2.controls[i].markAsDirty();
    }
  }
  _submitForm3() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm3.controls) {
      this.validateForm3.controls[i].markAsDirty();
    }
    this.loginService.register(this.validateForm3.value.email, this.validateForm3.value.checkPassword)
      .subscribe(user => {
        if (user.id) {
          this._notification.create('success', '成功', '注册完成');
          this.validateForm3.patchValue({ email: '' });
          this.validateForm3.patchValue({ password: '' });
          this.validateForm3.patchValue({ checkPassword: '' });
          this.loginFlag = true;
        } else {
          this._notification.create('error', '失败', '注册失败，请重试');
        }
      });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm3.controls['password'].value) {
      return { confirm: true, error: true };
    }
  }

  ngOnInit() {
    // token验证
    const token = this.loginService.getToken();
    if (token) {
      this.loginService.verify(token)
        .toPromise()
        .then((msg) => {
          if (msg === 'success') {
            this.authService.isLoggedIn = true;
            this.router.navigate([this.authService.redirectUrl]);
          } else {
            this.pageReady = true;
          }
        });
    } else {
      this.pageReady = true;
    }

    this.nameStream
      .switchMap(name => {
        return this.loginService.getRepeatName(
          name);
      })
      .subscribe(result => {
        let errors = this.validateForm3.controls.email.errors;
        if (!errors) {
          errors = {};
        }
        if (result > 0) {
          errors['email_repeat'] = true;
          this.validateForm3.controls.email.setErrors(errors);
        }
      });

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
    this.validateForm2 = this.fb.group({
      phoneNum: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    this.validateForm3 = this.fb.group({
      email: [null, Validators.email],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null],
      captcha: [null],
    });
  }

  onKeyUp() {
    if (this.validateForm3.controls['email'].value) {
      this.nameStream.next(this.validateForm3.controls['email'].value);
    }
  }

  toLogin() {
    this.loginFlag = true;
  }

  toRegister() {
    this.loginFlag = false;
  }
}
