import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, NavController, Events } from 'ionic-angular';
import { Response } from '@angular/http';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';

/**
 * Generated class for the VisitCtrlModuleStudentsMyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-students-my',
  templateUrl: 'visit-ctrl-module-students-my.html',
})
export class VisitCtrlModuleStudentsMyPage {
  public loginInfo: LoginInfo;
  logOutSuccessCallback: (res: Response) => void;
  getProfileSuccessCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController,
    public events: Events,
    private network: ClientNetworkService,
    private toast: ClientToastService,
    public navParams: NavParams) {
    this.loginInfo = new LoginInfo();

    console.log('picPath = ', this.loginInfo.picPath);
    this.loginInfo.nickname = localStorage.getItem('nickname');
    this.loginInfo.picPath =  localStorage.getItem('picPath');
    this.loginInfo.telnumber = localStorage.getItem('telnumber');

    this.logOutSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Object>>(res.json());
      if (dataResult.status == "1") {
        console.log("logout");
        localStorage.clear();
        this.events.publish('tabs:logout')
      }
    };

    this.getProfileSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<LoginInfo>>(res.json());
      console.log('dataReuslt = ', dataResult);
      if (dataResult.status == "1") {
        this.loginInfo = dataResult.result;
        this.loginInfo.userType = "1";
        if(this.network.debugMode == false)
          this.loginInfo.picPath = GlobalUrl.URL_HOST1 + this.loginInfo.picPath;

        console.log('loginInfo = ', this.loginInfo);
      }
      else if (dataResult.status == "-1") {
        this.toast.showToast( '该账户用户不存在');
      }
    }
  }

  jumpToMyClassPage() {
    this.modalCtrl.create('VisitCtrlModuleMyClassPage').present();
  }

  jumpToMyGoodsPage() {
    this.modalCtrl.create('VisitCtrlModuleMyGoodsPage').present();
  }

  jumpToEditprofile() {
    this.modalCtrl.create('VisitCtrlModuleEditprofilePage').present();
  }

  jumpToEditPassword() {
    this.modalCtrl.create('VisitCtrlModuleEditpasswordPage').present();
  }

  logOut() {
    console.log("POST ==> logout");
    let body = {
      'id': localStorage.getItem('userId')
    };
    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_LOGOUT, body, { successCallback: this.logOutSuccessCallback });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleTeachersMyPage');
    this.getProfile();
  }

  getProfile() {
    let body = {
      'studentId': localStorage.getItem('userId'),
    }

    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_STUDENT_PROFILE, body, { successCallback: this.getProfileSuccessCallback });
  }

}
