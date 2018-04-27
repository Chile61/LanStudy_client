import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, NavController, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the VisitCtrlModuleTeachersMyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-teachers-my',
  templateUrl: 'visit-ctrl-module-teachers-my.html',
})
export class VisitCtrlModuleTeachersMyPage {
  public loginInfo: LoginInfo;
  logOutSuccessCallback: (res: Response) => void;
  getProfileSuccessCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController,
    public events: Events,
    private network: ClientNetworkService,
    private toast: ClientToastService, 
    public navParams: NavParams) {

    let host = '';
    if (this.network.debugMode == false) {
      host = GlobalUrl.URL_HOST1;
    }

    this.loginInfo = new LoginInfo();
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
      if (dataResult.status == "1") {
        this.loginInfo = dataResult.result;
        this.loginInfo.userType = "2";
        if(this.network.debugMode == false)
          this.loginInfo.picPath = host + this.loginInfo.picPath;
        console.log('loginInfo = ', this.loginInfo);
      }
      else if (dataResult.status == "-1") {
        this.toast.showToast( '该账户用户不存在');
      }
    }

  }

  jumpToEditprofile() {
    this.modalCtrl.create('VisitCtrlModuleEditprofilePage').present();
  }

  jumpToEditPassword() {
    this.modalCtrl.create('VisitCtrlModuleEditpasswordPage').present();
  }

  logOut() {
    console.log("POST ==> logout.do");
    let body = {
      'id': localStorage.getItem('userId')
    };
    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_LOGOUT, body, { successCallback: this.logOutSuccessCallback });
  }

  getProfile() {
    let body = {
      'teacherId': localStorage.getItem('userId'),
    }

    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_TEACHER_PROFILE, body, { successCallback: this.getProfileSuccessCallback });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleTeachersMyPage');
    this.getProfile();
  }

}
