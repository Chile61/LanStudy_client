import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Student } from '../../utils/student';
import { Subject } from '../../utils/subject';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';


/**
 * Generated class for the ParentModuleHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-module-home',
  templateUrl: 'parent-module-home.html',
})
export class ParentModuleHomePage {
  userId: string;
  token: string;

  childSelect: string;
  subjectSelect: string;
  curSubject: Subject;
  curChild: Student;

  childList: Array<Student>;

  subjectList: Array<Subject>;


  successCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController,
    public navParams: NavParams,
    private network: ClientNetworkService,
    private toast: ClientToastService
  ) {
    this.userId = localStorage.getItem('userId');

    this.subjectList = [
      {
        subjectId: "100",
        name: "数学"
      },
      {
        subjectId: "101",
        name: "英语"
      }
    ];

    this.subjectSelect = this.subjectList[0].name;
    this.curSubject = this.subjectList[0];

    console.log(this.subjectSelect);
    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Student>>>(res.json()));
      if (dataResult.status == "1") {
        this.childList = dataResult.result;
        if(this.childList.length>0){
          this.childSelect = this.childList[0].nickname;
          this.curChild = this.childList[0];
        }
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentModuleHomePage');
    this.getChildrenList(this.userId, this.token);
  }

  // ************** 控件点击事件 *************//
  // 修改孩子
  studentChange(name: string) {
    this.childList.forEach(element => {
      if (element.nickname == name) {
        this.curChild = element;
        localStorage.setItem('curStudentId', element.studentId);
      }
    });
    console.log('student id = ', this.curChild);
  }

  // 修改科目
  subjectChange(name: string) {
    this.subjectList.forEach(element => {
      if (element.name == name) {
        this.curSubject = element;
        localStorage.setItem('curSubjectId', element.subjectId);

      }
    });
    console.log('subject id = ', this.curSubject);
  }

  // 调到详情页面
  jumpToInfoPage(type: string) {
    this.modalCtrl.create('ParentModuleHomeworkInfoPage', {
      'tip': this.curChild.nickname + '-' + this.curSubject.name,
      'type': type
    }).present();
  }

  onHomeworkInfoBtnClick() {
    if (this.canJump())
      this.jumpToInfoPage('homeworkInfo');
  }

  onExamInfoBtnClick() {
    if (this.canJump())
      this.jumpToInfoPage('examInfo');
  }

  onPracticeInfoBtnClick() {
    if (this.canJump())
      this.jumpToInfoPage('practiceInfo');
  }

  onScheduleBtnClick() {
    if (this.curChild == null) {
      this.toast.showToast("请在顶部下拉框中选择孩子", 'top');

    }
    else {
      this.modalCtrl.create('TimeManagerModuleScheduleInfoPage').present();
    }
  }

  canJump(): boolean {
    if (this.curChild == null) {
      this.toast.showToast("请在顶部下拉框中选择孩子",'top');
      return false;
    }
    else if (this.curSubject == null) {
      this.toast.showToast("请在顶部下拉框中选择科目",'top');
      return false;
    }
    else {
      return true;
    }

  }



  getChildrenList(userId: string, token: string) {

    let body = {
      'parentId': userId,
    }
    this.network.postRequest(GlobalUrl.URL_PARENT_MODULE_GET_CHILDREN, body,{successCallback: this.successCallback});
  }


}
