import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { Class } from '../../utils/class'
import { Student } from '../../utils/student'
import { AlertController } from 'ionic-angular';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientToastService } from '../../services/client-toast.service';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the ClassManagerModuleClassInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class-manager-module-class-info',
  templateUrl: 'class-manager-module-class-info.html',
})
export class ClassManagerModuleClassInfoPage {
  classList: Array<Class>;
  // studentList: Array<Student>;
  getClassInfoSuccessCallback: any;
  addStudentSuccessCallback: any;
  createClassSuccessCallback: any;
  getMyClassListSuccessCallback: any;

  curClass: Class;
  userId: string;

  constructor(public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtr: AlertController,
    private toast: ClientToastService,
    private network: ClientNetworkService
  ) {
    this.curClass = new Class();
    this.classList = new Array<Class>();
    this.getClassInfoSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Student>>>(res.json());
      if (dataResult.status == "1") {
        this.curClass.studentList = dataResult.result;
        console.log('studentList = ', this.curClass.studentList);
      }
    }

    this.addStudentSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<boolean>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          this.toast.showToast('添加成功');
          this.getClassInfo(this.userId, this.curClass.classId);
        }
        else {
          this.toast.showToast('添加失败，请检查手机号是否输入正确');
        }
      }
    }

    this.createClassSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<boolean>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          this.toast.showToast('创建成功');
          this.getMyClassList(this.userId);
        }
        else {
          this.toast.showToast('创建失败，已存在同样的班级');
        }
      }
    }

    this.getMyClassListSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Class>>>(res.json());
      if (dataResult.status == "1") {
        this.classList = dataResult.result;
        GlobalUserInfo.Instance.set('MyClassList', this.classList);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassManagerModuleClassInfoPage');
    this.userId = localStorage.getItem('userId');
    this.classList = GlobalUserInfo.Instance.get('MyClassList');
  }

  curClassChange(name: string) {
    this.classList.forEach(element => {
      if (name == element.className) {
        this.curClass = element;
      }
    });

    if (this.curClass.classId != null) {
      this.getClassInfo(this.userId, this.curClass.classId);
    }
  }

  onStudentItemClick(index) {
    this.curClass.studentList[index].classId = this.curClass.classId;
    this.curClass.studentList[index].className = this.curClass.className;

    this.modalCtrl.create('ClassManagerModuleStudentDetailsPage', {
      'curStudent': this.curClass.studentList[index],

    }).present();
  }

  onAddStudentBtnClick() {
    if (this.curClass != null && this.curClass.classId != null) {
      let promt = this.alertCtr.create({
        title: "添加学生",
        inputs: [
          {
            placeholder: "请输入学生的手机号",
            name: "phoneNumber"
          },
        ],
        buttons: [
          {
            text: "取消",
            handler: data => { console.log("取消"); }
          },
          {
            text: "确认",
            handler: data => {
              console.log(data.phoneNumber);
              console.log("确认提交");
              this.addStudentToClass(this.userId, this.curClass.classId, data);
            }
          }
        ]
      })

      promt.present();
    }

  }

  onAddClassBtnClick() {
    let promt = this.alertCtr.create({
      title: '添加班级',
      inputs: [
        {
          label: "学校名称",
          name: "schoolName",
          placeholder: "请输入学校名称（例如：蓝天中学）"
        },
        {
          label: "班级",
          name: "className",
          placeholder: "请输入班级（例如：七（1）班）"

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
            console.log(data.schoolName);
            console.log(data.className);
            console.log("确认提交");
            if (data.schoolName && data.className) {
              this.createClass(this.userId, data.schoolName, data.className)
            }
            else {
              this.toast.showToast('输入信息不能为空');
            }
            // PostClass(data.SchoolName,data.grade,data.classes,data.classId);
          }
        }
      ]
    })

    promt.present();
  }

  getClassInfo(userId: string, classId: string) {
    let body = {
      'userId': userId,
      'classId': classId
    };

    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_CLASS_INFO, body, { successCallback: this.getClassInfoSuccessCallback });
  }

  addStudentToClass(userId: string, classId: string, telnumber: string) {
    let body = {
      'userId': userId,
      'classId': classId,
      'telnumber': telnumber
    };
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_ADD_STUDENT, body, { successCallback: this.addStudentSuccessCallback });
  }

  createClass(userId: string, schoolName: string, className: string) {
    let body = {
      'userId': userId,
      'schoolName': schoolName,
      'className': className
    };
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_CREATE_CLASS, body, { successCallback: this.createClassSuccessCallback });
  }

  getMyClassList(userId: string) {
    let body = {
      'userId': userId
    };
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CLASS_LIST, body, { successCallback: this.getMyClassListSuccessCallback });
  }


}

