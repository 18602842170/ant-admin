import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Routes } from '@angular/router';
import { registerShape } from 'viser-ng';
import { Observable } from 'rxjs/Observable';
import { SubjectSubscriber } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
const DataSet = require('@antv/data-set');

registerShape('point', 'pointer', {
  draw(cfg, container) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0
    });
    // 绘制指针
    container.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y + 15,
        stroke: cfg.color,
        lineWidth: 5,
        lineCap: 'round'
      }
    });
    return container.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 9.75,
        stroke: cfg.color,
        lineWidth: 4.5,
        fill: '#fff'
      }
    });
  }
});

registerShape('point', 'cloud', {
  draw(cfg, container) {
    return container.addShape('text', {
      attrs: {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic',
        ...cfg.style,
        x: cfg.x,
        y: cfg.y,
      },
    });
  }
});

const scale = [{
  dataKey: 'value',
  min: 0,
  max: 9,
  ticks: [2.25, 3.75, 5.25, 6.75],
  nice: false
}];

const data = [
  { value: 8.7 }
];

const scale2 = [
  { dataKey: 'x', nice: false },
  { dataKey: 'y', nice: false },
];

const padding = [0];

const sourceData = [
  { item: '事例一', count: 28 },
  { item: '事例二', count: 72 },
];

const scale4 = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];

const dv4 = new DataSet.View().source(sourceData);
dv4.transform({
  type: 'percent',
  field: 'count',
  dimension: 'item',
  as: 'percent'
});
const data4 = dv4.rows;

const word_cloud = [
  {
    'x': 'China',
    'value': 1383220000,
    'category': 'asia'
  },
  {
    'x': 'India',
    'value': 1316000000,
    'category': 'asia'
  },
  {
    'x': 'United States',
    'value': 324982000,
    'category': 'america'
  },
  {
    'x': 'Indonesia',
    'value': 263510000,
    'category': 'asia'
  },
  {
    'x': 'Brazil',
    'value': 207505000,
    'category': 'america'
  },
  {
    'x': 'Pakistan',
    'value': 196459000,
    'category': 'asia'
  },
  {
    'x': 'Nigeria',
    'value': 191836000,
    'category': 'africa'
  },
  {
    'x': 'Bangladesh',
    'value': 162459000,
    'category': 'asia'
  },
  {
    'x': 'Russia',
    'value': 146804372,
    'category': 'europe'
  },
  {
    'x': 'Japan',
    'value': 126790000,
    'category': 'asia'
  },
  {
    'x': 'Mexico',
    'value': 123518000,
    'category': 'america'
  },
  {
    'x': 'Ethiopia',
    'value': 104345000,
    'category': 'africa'
  },
  {
    'x': 'Philippines',
    'value': 104037000,
    'category': 'asia'
  },
  {
    'x': 'Egypt',
    'value': 93013300,
    'category': 'africa'
  },
  {
    'x': 'Vietnam',
    'value': 92700000,
    'category': 'asia'
  },
  {
    'x': 'Germany',
    'value': 82800000,
    'category': 'europe'
  },
  {
    'x': 'Democratic Republic of the Congo',
    'value': 82243000,
    'category': 'africa'
  },
  {
    'x': 'Iran',
    'value': 80135400,
    'category': 'asia'
  },
  {
    'x': 'Turkey',
    'value': 79814871,
    'category': 'asia'
  },
  {
    'x': 'Thailand',
    'value': 68298000,
    'category': 'asia'
  },
  {
    'x': 'France',
    'value': 67013000,
    'category': 'europe'
  },
  {
    'x': 'United Kingdom',
    'value': 65110000,
    'category': 'europe'
  },
  {
    'x': 'Italy',
    'value': 60599936,
    'category': 'europe'
  },
  {
    'x': 'Tanzania',
    'value': 56878000,
    'category': 'africa'
  },
  {
    'x': 'South Africa',
    'value': 55908000,
    'category': 'africa'
  },
  {
    'x': 'Myanmar',
    'value': 54836000,
    'category': 'asia'
  },
  {
    'x': 'South Korea',
    'value': 51446201,
    'category': 'asia'
  },
  {
    'x': 'Colombia',
    'value': 49224700,
    'category': 'america'
  },
  {
    'x': 'Kenya',
    'value': 48467000,
    'category': 'africa'
  },
  {
    'x': 'Spain',
    'value': 46812000,
    'category': 'europe'
  },
  {
    'x': 'Argentina',
    'value': 43850000,
    'category': 'america'
  },
  {
    'x': 'Ukraine',
    'value': 42541633,
    'category': 'europe'
  },
  {
    'x': 'Sudan',
    'value': 42176000,
    'category': 'africa'
  },
  {
    'x': 'Uganda',
    'value': 41653000,
    'category': 'africa'
  },
  {
    'x': 'Algeria',
    'value': 41064000,
    'category': 'africa'
  },
  {
    'x': 'Poland',
    'value': 38424000,
    'category': 'europe'
  },
  {
    'x': 'Iraq',
    'value': 37883543,
    'category': 'asia'
  },
  {
    'x': 'Canada',
    'value': 36541000,
    'category': 'america'
  },
  {
    'x': 'Morocco',
    'value': 34317500,
    'category': 'africa'
  },
  {
    'x': 'Saudi Arabia',
    'value': 33710021,
    'category': 'asia'
  },
  {
    'x': 'Uzbekistan',
    'value': 32121000,
    'category': 'asia'
  },
  {
    'x': 'Malaysia',
    'value': 32063200,
    'category': 'asia'
  },
  {
    'x': 'Peru',
    'value': 31826018,
    'category': 'america'
  },
  {
    'x': 'Venezuela',
    'value': 31431164,
    'category': 'america'
  },
  {
    'x': 'Nepal',
    'value': 28825709,
    'category': 'asia'
  },
  {
    'x': 'Angola',
    'value': 28359634,
    'category': 'africa'
  },
  {
    'x': 'Ghana',
    'value': 28308301,
    'category': 'africa'
  },
  {
    'x': 'Yemen',
    'value': 28120000,
    'category': 'asia'
  },
  {
    'x': 'Afghanistan',
    'value': 27657145,
    'category': 'asia'
  },
  {
    'x': 'Mozambique',
    'value': 27128530,
    'category': 'africa'
  },
  {
    'x': 'Australia',
    'value': 24460900,
    'category': 'australia'
  },
  {
    'x': 'North Korea',
    'value': 24213510,
    'category': 'asia'
  },
  {
    'x': 'Taiwan',
    'value': 23545680,
    'category': 'asia'
  },
  {
    'x': 'Cameroon',
    'value': 23248044,
    'category': 'africa'
  },
  {
    'x': 'Ivory Coast',
    'value': 22671331,
    'category': 'africa'
  },
  {
    'x': 'Madagascar',
    'value': 22434363,
    'category': 'africa'
  },
  {
    'x': 'Niger',
    'value': 21564000,
    'category': 'africa'
  },
  {
    'x': 'Sri Lanka',
    'value': 21203000,
    'category': 'asia'
  },
  {
    'x': 'Romania',
    'value': 19760000,
    'category': 'europe'
  },
  {
    'x': 'Burkina Faso',
    'value': 19632147,
    'category': 'africa'
  },
  {
    'x': 'Syria',
    'value': 18907000,
    'category': 'asia'
  },
  {
    'x': 'Mali',
    'value': 18875000,
    'category': 'africa'
  },
  {
    'x': 'Malawi',
    'value': 18299000,
    'category': 'africa'
  },
  {
    'x': 'Chile',
    'value': 18191900,
    'category': 'america'
  },
  {
    'x': 'Kazakhstan',
    'value': 17975800,
    'category': 'asia'
  },
  {
    'x': 'Netherlands',
    'value': 17121900,
    'category': 'europe'
  },
  {
    'x': 'Ecuador',
    'value': 16737700,
    'category': 'america'
  },
  {
    'x': 'Guatemala',
    'value': 16176133,
    'category': 'america'
  },
  {
    'x': 'Zambia',
    'value': 15933883,
    'category': 'africa'
  },
  {
    'x': 'Cambodia',
    'value': 15626444,
    'category': 'asia'
  },
  {
    'x': 'Senegal',
    'value': 15256346,
    'category': 'africa'
  },
  {
    'x': 'Chad',
    'value': 14965000,
    'category': 'africa'
  },
  {
    'x': 'Zimbabwe',
    'value': 14542235,
    'category': 'africa'
  },
  {
    'x': 'Guinea',
    'value': 13291000,
    'category': 'africa'
  },
  {
    'x': 'South Sudan',
    'value': 12131000,
    'category': 'africa'
  },
  {
    'x': 'Rwanda',
    'value': 11553188,
    'category': 'africa'
  },
  {
    'x': 'Belgium',
    'value': 11356191,
    'category': 'europe'
  },
  {
    'x': 'Tunisia',
    'value': 11299400,
    'category': 'africa'
  },
  {
    'x': 'Cuba',
    'value': 11239004,
    'category': 'america'
  },
  {
    'x': 'Bolivia',
    'value': 11145770,
    'category': 'america'
  },
  {
    'x': 'Somalia',
    'value': 11079000,
    'category': 'africa'
  },
  {
    'x': 'Haiti',
    'value': 11078033,
    'category': 'america'
  },
  {
    'x': 'Greece',
    'value': 10783748,
    'category': 'europe'
  },
  {
    'x': 'Benin',
    'value': 10653654,
    'category': 'africa'
  },
  {
    'x': 'Czech Republic',
    'value': 10578820,
    'category': 'europe'
  },
  {
    'x': 'Portugal',
    'value': 10341330,
    'category': 'europe'
  },
  {
    'x': 'Burundi',
    'value': 10114505,
    'category': 'africa'
  },
  {
    'x': 'Dominican Republic',
    'value': 10075045,
    'category': 'america'
  },
  {
    'x': 'Sweden',
    'value': 10054100,
    'category': 'europe'
  },
  {
    'x': 'United Arab Emirates',
    'value': 10003223,
    'category': 'asia'
  },
  {
    'x': 'Jordan',
    'value': 9889270,
    'category': 'asia'
  },
  {
    'x': 'Azerbaijan',
    'value': 9823667,
    'category': 'asia'
  },
  {
    'x': 'Hungary',
    'value': 9799000,
    'category': 'europe'
  },
  {
    'x': 'Belarus',
    'value': 9498600,
    'category': 'europe'
  },
  {
    'x': 'Honduras',
    'value': 8866351,
    'category': 'america'
  },
  {
    'x': 'Austria',
    'value': 8773686,
    'category': 'europe'
  },
  {
    'x': 'Tajikistan',
    'value': 8742000,
    'category': 'asia'
  },
  {
    'x': 'Israel',
    'value': 8690220,
    'category': 'asia'
  },
  {
    'x': 'Switzerland',
    'value': 8417700,
    'category': 'europe'
  },
  {
    'x': 'Papua New Guinea',
    'value': 8151300,
    'category': 'australia'
  }
];
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less']
})

export class MonitorComponent implements OnInit, OnDestroy {

  data3 = [
  ];
  scale3 = [{
    dataKey: 'value',
    min: 45,
  }, {
    dataKey: 'year',
    tickCount: 5,
  }];

  padding: 'auto';
  forceFit = true;
  height = 280;
  data = data;
  scale = scale;
  axisLabel = {
    offset: -20,
    formatter: (val: string) => {
      if (val === '2.25') {
        return '差';
      } else if (val === '3.75') {
        return '中';
      } else if (val === '5.25') {
        return '良';
      }
      return '优';
    },
    textStyle: {
      fontSize: 18,
      textAlign: 'center'
    }
  };
  lineGuide1Start = [3, 0.905];
  lineGuide1End = [3.0035, 0.85];
  lineGuide1LineStyle = {
    stroke: '#19AFFA',
    lineDash: null,
    lineWidth: 3
  };
  lineGuide2Start = [4.5, 0.905];
  lineGuide2End = [4.5, 0.85];
  lineGuide2LineStyle = {
    stroke: '#19AFFA',
    lineDash: null,
    lineWidth: 3
  };
  lineGuide3Start = [6, 0.905];
  lineGuide3End = [6.0035, 0.85];
  lineGuide3LineStyle = {
    stroke: '#19AFFA',
    lineDash: null,
    lineWidth: 3
  };
  arcGuide1Start = [0, 0.945];
  arcGuide1End = [9, 0.945];
  arcGuide1Style = {
    stroke: '#CBCBCB',
    lineWidth: 18,
  };
  arcGuide2Start = [0, 0.945];
  arcGuide2End = [data[0].value, 0.945];
  arcGuide2Style = {
    stroke: '#1890FF',
    lineWidth: 18,
  };
  htmlGuidePosition = ['50%', '95%'];
  htmlGuideHtml = `
      <div style="width: 160px;text-align: center;">
        <p style="font-size: 14px;color: #545454;margin: 0;">跳出率</p>
        <p style="font-size: 24px;color: #545454;margin: 0;">${data[0].value * 10}%</p>
      </div>
    `;

  scale2 = scale2;
  data2 = [];

  height4 = 400;
  data4 = data4;
  scale4 = scale4;
  pieStyle = {
    stroke: '#fff',
    lineWidth: 1,
  };
  labelConfig = ['percent', {
    formatter: (val, item) => {
      return item.point.item + ': ' + val;
    },
  }];
  // tslint:disable-next-line:max-line-length
  guideHtml = '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">中式快餐<br><span style="color:#8c8c8c;font-size:20px">28%</span></div>';
  guidePosition = ['50%', '50%'];
  // tslint:disable-next-line:max-line-length
  guideHtml2 = '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">西餐<br><span style="color:#8c8c8c;font-size:20px">22%</span></div>';
  guidePosition2 = ['50%', '50%'];
  // tslint:disable-next-line:max-line-length
  guideHtml3 = '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">火锅<br><span style="color:#8c8c8c;font-size:20px">32%</span></div>';
  guidePosition3 = ['50%', '50%'];

  endDate = Date.now() + 3600000;
  // 父组件传递标题
  title: string;
  // 小时差
  private hour: number;
  // 分钟差
  private minute: number;
  // 秒数差
  private second: number;
  // 时间差
  private _diff: number;
  private get diff() {
    return this._diff;
  }
  private set diff(val) {
    this._diff = Math.floor(val / 1000);
    this.hour = Math.floor(this._diff / 3600);
    this.minute = Math.floor((this._diff % 3600) / 60);
    this.second = (this._diff % 3600) % 60;
  }
  // 定时器
  private timer: Subscription;
  private data3Timer: Subscription;


  // 销毁组件时清除定时器
  ngOnDestroy() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
    if (this.data3Timer) {
      this.data3Timer.unsubscribe();
    }
  }
  constructor() {
    const dv = new DataSet.View().source(word_cloud);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [640, 400],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = Math.floor((Math.random() * 4));
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (80 - 24) + 24;
        }
        return 0;
      }
    });
    this.data2 = dv.rows;
  }
  ngOnInit() {
    function fixedZero(val) {
      return val * 1 < 10 ? `0${val}` : val;
    }
    this.timer = Observable.timer(0, 1000)
      .subscribe(_ => {
        this.diff = this.endDate - Date.now();
      });
    this.data3Timer = Observable.timer(0, 1000)
      .subscribe(xx => {
        const activeData = [];
        for (let i = 0; i < 24; i += 1) {
          activeData.push({
            year: `${fixedZero(i)}:00`,
            value: Math.floor(Math.random() * 200) + (i * 50),
          });
        }
        this.data3 = activeData;
      });
  }
}
