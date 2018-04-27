import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';


/**
 * Generated class for the TeacherModuleHomeworkCorrectingCanvasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-correcting-canvas',
  templateUrl: 'teacher-module-homework-correcting-canvas.html',
})
export class TeacherModuleHomeworkCorrectingCanvasPage {
  @ViewChild('canvas') canvasEl: ElementRef;
  @ViewChild('content') content: Content;
  private _CANVAS: any;
  private _CONTEXT: any;
  private image: any;//背景图（作业）
  lastX: any;
  lastY: any;

  constructor(public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams) {

    // this.image.src = 'http://172.21.240.173:8080/lantian/img/123.JPG';
    // this.image.src = './assets/imgs/logo.png';
    // this.image.crossOrigin="Anonymous";


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkCorrectingCanvasPage');
    this._CANVAS = this.canvasEl.nativeElement;
  }

  ionViewDidEnter() {
    // console.log(this.content.contentWidth, ',', this.content.contentHeight);
    this._CANVAS.width = this.content.contentWidth;
    this._CANVAS.height = this.content.contentHeight - 1;
    this.initialiseCanvas();

    this.lastX = -1;
    this.lastY = -1;

    let url = 'http://d.hiphotos.baidu.com/zhidao/pic/item/9a504fc2d56285354eaf3e5393ef76c6a7ef6371.jpg';
    this.requestImage(url);
  }

  requestImage(url) {
    this.image = new Image();
    this.image.src = url;
    this.image.setAttribute("crossOrigin", 'anonymous')
    let me = this;
    this.image.onload = function (e) {
      me.onResetBtnClick();
    };
    this.image.onerror = function () {
      console.log('load image error');
      var timeStamp = new Date();
      me.requestImage(url + '?' + timeStamp);
    }
  }

  onResetBtnClick() {
    this.clearCanvas();
    this.drawBackGround();
  }

  onAcceptBtnClick() {
    let url = this._CANVAS.toDataURL();
    // console.log('save as ', url);
    this.events.publish('correct:complete', url);
    this.navCtrl.pop();
  }

  initialiseCanvas() {
    if (this._CANVAS.getContext) {
      this.setupCanvas();
    }
  }

  setupCanvas() {
    console.log('setup canvas');
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CONTEXT.fillStyle = "#3e3e3e";
    this._CONTEXT.fillRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this._CONTEXT.lineWidth = 1;
    this._CONTEXT.strokeStyle = '#ff0000';
  }

  clearCanvas() {
    console.log('clear: ', this._CANVAS.width, ',', this._CANVAS.height);
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this.setupCanvas();
  }


  drawBackGround() {
    console.log('draw');
    let newwidth = this._CANVAS.width;
    let newheight = this._CANVAS.height;
    let width = this.image.width;
    let height = this.image.height;

    //自适应  
    var bla = newwidth / width;
    var blb = newheight / height;
    if (bla > blb) {
      newwidth = width * blb;
      newheight = height * blb
    }
    else {
      newwidth = width * bla;
      newheight = height * bla;
    }

    this._CONTEXT.drawImage(this.image, 0, 0, newwidth, newheight);

    this._CONTEXT.restore();
  }

  touch(event) {
    let x = event.changedPointers[0].clientX;
    let y = event.changedPointers[0].clientY;

    if (event.eventType == 4) {
      this.lastX = -1;
      this.lastY = -1;
    }

    if (event.eventType == 2 && x < this._CANVAS.width && y < this._CANVAS.height && x > 0 && y > 0) {
      if (this.lastX > 0) {
        this._CONTEXT.beginPath();

        this._CONTEXT.moveTo(this.lastX, this.lastY)
        this._CONTEXT.lineTo(x, y);
        this._CONTEXT.stroke();
      }
      else {

      }
      this.lastX = x;
      this.lastY = y;
    }
  }

}
