import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Class } from '../../utils/class'
import { Student } from '../../utils/student'
import { AlertController } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the VisitCtrlModuleMyClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-my-class',
  templateUrl: 'visit-ctrl-module-my-class.html',
})
export class VisitCtrlModuleMyClassPage {

  myClass: Class;

  getMyClassSuccessCallback: any;
  getClassInfoSuccessCallback: any;
  quitClassSuccessCallback: any;
  joinClassSuccessCallback: any;
  myFooter: HTMLElement;
  userId: string;

  constructor(public modalCtrl: ModalController, private network: ClientNetworkService, private toast:ClientToastService, public navParams: NavParams, public alertCtr: AlertController) {
    this.myClass = new Class();

    this.getMyClassSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Class>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          this.myClass = dataResult.result;
          console.log('myClass = ', this.myClass);
          this.myFooter.hidden = false;
          this.getClassInfo(this.userId, this.myClass.classId);
        }
      }
    }

    this.getClassInfoSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Student>>>(res.json());
      if (dataResult.status == "1") {
        this.myClass.studentList = dataResult.result;
        console.log('studentList = ', this.myClass.studentList);
      }
    }

    this.quitClassSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<boolean>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          console.log('quit class successfully');
          this.myFooter.hidden = true;
          this.myClass = new Class();
        }
      }
    }

    this.joinClassSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Class>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          this.myClass = dataResult.result;
          console.log('myClass = ', this.myClass);
          this.myFooter.hidden = false;
          this.getClassInfo(this.userId, this.myClass.classId);
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassManagerModuleClassInfoPage');
    this.myFooter = document.getElementById('my-footer');
    this.myFooter.hidden = true;
    this.userId = localStorage.getItem('userId');
    this.getMyClass(this.userId);
    this.myFooter = document.getElementById('my-footer');
  }

  onJoinClassBtnClick() {
    if (this.myClass.classId != null) {
      this.toast.showToast( '你已经有了班级，先退出现有班级才可以添加')
    } else {
      let promt = this.alertCtr.create({
        title: '添加班级',
        inputs: [
          {
            label: "班级ID",
            name: "classId",
            placeholder: "请输入班级ID"
          }
        ],
        buttons: [
          {
            text: "取消",
            handler: data => { console.log("取消"); }
          },
          {
            text: "确认",
            handler: data => {
              console.log("确认提交");
              this.joinClass(this.userId, data);
            }
          }
        ]
      })

      promt.present();
    }
  }

  onQuitClassBtnClick() {
    if (this.myClass.classId) {
      this.quitClass(this.userId, this.myClass.classId);
    }
  }

  quitClass(userId: string, classId: string) {
    let body = {
      'userId': userId,
      'classId': classId
    };
    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_QUIT_CLASS, body, {successCallback: this.quitClassSuccessCallback});
  }

  joinClass(userId: string, classCode: string) {
    let body = {
      'userId': userId,
      'classCode': classCode
    };
    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_JOIN_CLASS, body, {successCallback: this.joinClassSuccessCallback});
  }

  getMyClass(userId: string) {
    let body = {
      'userId': userId
    };

    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_MY_CLASS, body, {successCallback: this.getMyClassSuccessCallback});
  }

  getClassInfo(userId: string, classId: string) {
    let body = {
      'userId': userId,
      'classId': classId
    };

    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_CLASS_INFO, body, {successCallback: this.getClassInfoSuccessCallback});
  }

}

