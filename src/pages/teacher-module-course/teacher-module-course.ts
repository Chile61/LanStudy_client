import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, ModalController, AlertController } from 'ionic-angular';
import { Class } from '../../utils/Class';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the TeacherModuleCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-course',
  templateUrl: 'teacher-module-course.html',
})
export class TeacherModuleCoursePage {
  classList: Array<Class>;
  curClass: Class;
  successCallback: any;

  constructor(
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private network: ClientNetworkService,
    private toast: ClientToastService
  ) {
    this.classList = new Array<Class>();

    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Class>>>(res.json());
      if (dataResult.status == "1") {
        this.classList = dataResult.result;
        GlobalUserInfo.Instance.set('MyClassList', this.classList);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleCoursePage');
    this.getClassList();
  }

  homeworkManagement() {
    if (this.canJump()) {
      let modal = this.modalCtrl.create('TeacherModuleHomeworkManagementPage');
      modal.present();
    }
  }

  // prepareLessons() {

  //   let modal = this.modalCtrl.create('TeacherModulePrepareLessonsPage');
  //   modal.present();


  // }

  homeworkCorrecting() {
    if (this.canJump()) {
      let modal = this.modalCtrl.create('TeacherModuleHomeworkCorrectingPage');
      modal.present();
    }

  }

  statistics() {
    if (this.canJump()) {
      let modal = this.modalCtrl.create('TeacherModuleStatisticsPage');
      modal.present();
    }

  }
  questionManagement() {
    let alert1 = this.alertCtrl.create({
      title: '请选择题目的类型',
      inputs: [
        {
          type: 'radio',
          value: '1',
          label: '语文',
          checked: true,
        },
        {
          type: 'radio',
          value: '2',
          label: '数学',
        },
        {
          type: 'radio',
          value: '3',
          label: '英语',
        },

      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {
            let modal = this.modalCtrl.create('TeacherModuleQuestionManagementPage', { subject_id: data });
            modal.present();
          }
        }
      ]
    });
    alert1.present();

  }

  getClassList() {
    let body = {
      'userId': localStorage.getItem('userId'),
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CLASS_LIST, body, { successCallback: this.successCallback })
  }

  curClassChange(name: string) {
    this.classList.forEach(ele => {
      if (ele.className == name) {
        this.curClass = ele;
        localStorage.setItem('curClassId', this.curClass.classId);
        localStorage.setItem('curClassName', this.curClass.className);
      }
    });
    console.log('curClass = ', this.curClass);
  }

  canJump(): boolean {
    if (this.curClass == null) {
      this.toast.showToast('请在下拉框选择班级');
    }

    return !(this.curClass == null);
  }

}
