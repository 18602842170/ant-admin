import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import * as html2canvas from 'html2canvas';

const DataSet = require('@antv/data-set');

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less']
})
export class AnalysisComponent implements OnInit {

  data1 = {
    data: [
      { year: '1991', value: 15468 },
      { year: '1992', value: 16100 },
      { year: '1993', value: 15900 },
      { year: '1994', value: 17409 },
      { year: '1995', value: 17000 },
      { year: '1996', value: 31056 },
      { year: '1997', value: 31982 },
      { year: '1998', value: 32040 },
      { year: '1999', value: 33233 },
    ],
    scale: [{
      dataKey: 'value',
      min: 10000,
    }, {
      dataKey: 'year',
      min: 0,
      max: 1,
    }],
    forceFit: true,
    height: 50,
    padding: [0, 0, 0, 0]
  };

  data2 = {
    data: [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ],
    scale: [{
      dataKey: 'sales',
      tickInterval: 20,
    }],
    forceFit: true,
    height: 50,
    padding: [0, 0, 0, 0]
  };

  data3 = {
    data: [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ],
    scale: [{
      dataKey: 'sales',
      tickInterval: 20,
    }],
    forceFit: true,
    height: 300,
    padding: 'auto'
  };

  tableData = [{
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
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }];

  _displayData: Array<any> = [];
  _operating = false;
  _dataSet = [];
  _indeterminate = false;

  radioValue = 'A';
  style = '';
  sourceData = [
    { item: '事例一', count: 40 },
    { item: '事例二', count: 21 },
    { item: '事例三', count: 17 },
    { item: '事例四', count: 13 },
    { item: '事例五', count: 9 }
  ];

  dv = new DataSet.View().source(this.sourceData);

  AnnularData = {
    scale: [{
      dataKey: 'percent',
      min: 0,
      formatter: '.0%',
    }],
    data: null,
    forceFit: true,
    height: 400,
    pieStyle: {
      stroke: '#fff',
      lineWidth: 1,
    },
    labelConfig: ['percent', {
      formatter: (val, item) => {
        return item.point.item + ': ' + val;
      }
    }],
    legend: {
      position: 'bottom'
    }
  };

  doubleLineSourceData = [
    { month: 'Jan', Tokyo: 7.0, London: 3.9 },
    { month: 'Feb', Tokyo: 6.9, London: 4.2 },
    { month: 'Mar', Tokyo: 9.5, London: 5.7 },
    { month: 'Apr', Tokyo: 14.5, London: 8.5 },
    { month: 'May', Tokyo: 18.4, London: 11.9 },
    { month: 'Jun', Tokyo: 21.5, London: 15.2 },
    { month: 'Jul', Tokyo: 25.2, London: 17.0 },
    { month: 'Aug', Tokyo: 26.5, London: 16.6 },
    { month: 'Sep', Tokyo: 23.3, London: 14.2 },
    { month: 'Oct', Tokyo: 18.3, London: 10.3 },
    { month: 'Nov', Tokyo: 13.9, London: 6.6 },
    { month: 'Dec', Tokyo: 9.6, London: 4.8 },
  ];

  doubleLineSourceDatadv = new DataSet.View().source(this.doubleLineSourceData);

  doubleLine = {
    scale: [{
      dataKey: 'month',
      min: 0,
      max: 1,
    }],
    data: null,
    forceFit: true,
    height: 400,
    style: { stroke: '#fff', lineWidth: 1 },
    padding: 'auto',
    legend: {
      position: 'top'
    }
  };

  canvasImg;

  constructor(
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < 46; i++) {
      this._dataSet.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }

    this.dv.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    this.AnnularData.data = this.dv.rows;

    this.doubleLineSourceDatadv.transform({
      type: 'fold',
      fields: ['Tokyo', 'London'],
      key: 'city',
      value: 'temperature',
    });

    this.doubleLine.data = this.doubleLineSourceDatadv.rows;
  }

  _displayDataChange($event) {
    this._displayData = $event;
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  createImg() {
    html2canvas(document.querySelector(`#analysisPage`)).then(canvas => {
      this.canvasImg = canvas.toDataURL(`image/png`);
    });
  }

  downloadFile(filename, content) {
    const base64Img = content;
    const oA = document.createElement('a');
    oA.href = base64Img;
    oA.download = filename;
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    oA.dispatchEvent(event);
  }

  saveImgLocal() {
    this.downloadFile('导出图片', this.canvasImg);
  }

}
