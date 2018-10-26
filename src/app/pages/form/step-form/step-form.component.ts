import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.less']
})
export class StepFormComponent implements OnInit {

  current = 0;

  index = 'First-content';

  validateForm: FormGroup;

  payuser: string;
  amount: number;
  receiveuser: string;
  receivename: string;

  constructor(
    private _message: NzMessageService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      payuser: ['ant-design@alipay.com', [Validators.required]],
      receivename: ['Alex', [Validators.required]],
      amount: [800, [Validators.required]],
      receiveuserPrefix: ['01'],
      receiveuser: ['test@example.com', [Validators.required]],
      password: ['123456', [Validators.required]]
    });
  }

  pre() {
    this.current -= 1;
  }

  next() {
    this.current += 1;
    this.payuser = this.validateForm.value.payuser;
    this.receiveuser = this.validateForm.value.receiveuser;
    this.receivename = this.validateForm.value.receivename;
    this.amount = this.validateForm.value.amount;
  }

  back() {
    this.current = 0;
  }

  _submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
