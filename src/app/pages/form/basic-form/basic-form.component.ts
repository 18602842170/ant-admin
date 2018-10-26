import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.less']
})
export class BasicFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  validateForm: FormGroup;
  radioValue: string;

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      date: [null, [Validators.required]],
      discription: [null, [Validators.required]],
      measure: [null, [Validators.required]],
      customer: [null],
      invite: [null],
      weight: [null],
      public: [null],
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  _submitForm() {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
  }
}
