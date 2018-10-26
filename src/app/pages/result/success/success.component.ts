import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.less']
})
export class SuccessComponent implements OnInit {
  current = 1;

  canvasImg;

  a = 'aaa';

  constructor(
  ) {
  }

  ngOnInit() {

  }

  createImg() {
    html2canvas(document.querySelector(`#successPage`)).then(canvas => {
      this.canvasImg = canvas.toDataURL(`image/png`);

      // var shareContent = document.getElementById("mainTable");//需要截图的包裹的（原生的）DOM 对象
      // var width = shareContent.offsetWidth; //获取dom 宽度
      // var height = shareContent.offsetHeight; //获取dom 高度
      // var canvas = document.createElement("canvas"); //创建一个canvas节点
      // var scale = 1; //定义任意放大倍数 支持小数
      // canvas.width = width * scale; //定义canvas 宽度 * 缩放
      // canvas.height = height * scale; //定义canvas高度 *缩放
      // canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      // var opts = {
      //   scale: scale, // 添加的scale 参数
      //   canvas: canvas, //自定义 canvas
      //   logging: true, //日志开关
      //   width: width, //dom 原始宽度
      //   height: height //dom 原始高度
      // };
      // html2canvas(shareContent, opts).then(canvas => {
      //   this.canvasImg = canvas.toDataURL("image/png");
      //   console.log(canvas)
      // });
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
