import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-advanced-details',
  templateUrl: './advanced-details.component.html',
  styleUrls: ['./advanced-details.component.less']
})
export class AdvacedDetailComponent implements OnInit {

  current = 1;

  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];
  constructor(
  ) {
  }

  ngOnInit() {

  }
}
