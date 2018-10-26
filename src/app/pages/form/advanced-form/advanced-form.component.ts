import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-advanced-form',
  templateUrl: './advanced-form.component.html',
  styleUrls: ['./advanced-form.component.less']
})
export class AdvacedFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) {
  }

  siteName = '';
  editRow = null;
  tempEditObject = {};
  _dateRange = [null, null];
  validateForm: FormGroup;
  data = [
    {
      key: 0,
      name: 'Edward King 0',
      num: '0001',
      unit: 'New York No. 1 Lake Park',
    },
    {
      key: 1,
      name: 'Edward King 1',
      num: '0002',
      unit: 'London No. 1 Lake Park',
    },
    {
      key: 2,
      name: 'Edward King 2',
      num: '0003',
      unit: 'Sidney No. 1 Lake Park',
    }
  ];
  options = [
    { value: '0', label: '付晓晓' },
    { value: '1', label: '周毛毛' },
  ];

  _console(value) {
    console.log(value);
  }

  edit(data) {
    this.tempEditObject[data.key] = { ...data };
    this.editRow = data.key;
  }

  save(data) {
    Object.assign(data, this.tempEditObject[data.key]);
    this.editRow = null;
  }

  cancel(data) {
    this.tempEditObject[data.key] = {};
    this.editRow = null;
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

  ngOnInit() {
    this.data.forEach(item => {
      this.tempEditObject[item.key] = {};
    });
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      ip: [null, [Validators.required]],
      receivename: [null, [Validators.required]],
      admin: [null, [Validators.required]],
      approve: [null, [Validators.required]],
      date: [null, [Validators.required]],
      type: [null, [Validators.required]],
      name2: [null, [Validators.required]],
      description: [null, [Validators.required]],
      execute: [null, [Validators.required]],
      response: [null, [Validators.required]],
      date2: [null, [Validators.required]],
      type2: [null, [Validators.required]],
    });
  }

}
