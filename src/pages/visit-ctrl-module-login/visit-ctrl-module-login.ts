import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, Platform, NavController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { BackButtonService } from '../../services/back-button.service';
import { ClientToastService } from '../../services/client-toast.service';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the VisitCtrlModuleLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-login',
  templateUrl: 'visit-ctrl-module-login.html',
})
export class VisitCtrlModuleLoginPage {
  list = [{ "key": '1', "value": '学生端', "chek": true }, { "key": '2', "value": '教师端', "chek": false }, { "key": '3', "value": '家长端', "chek": false }];
  data = { "key": '1', "value": '学生端', "chek": true };
  successCallback: (res: Response) => void;
  public username: string;

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private backBtnService: BackButtonService,
    private network: ClientNetworkService,
    private toast: ClientToastService,
    private platform: Platform) {

    this.platform.ready().then(() => {
      this.backBtnService.registerBackButtonAction(null);
    })

    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<LoginInfo>>(res.json());

      if (dataResult.status == "1") {
        console.log(dataResult);
        localStorage.setItem('userId', dataResult.result.id)
        localStorage.setItem('userType', (this.data.key));
        localStorage.setItem('nickname', dataResult.result.nickname);
        localStorage.setItem('telnumber', this.username);
        localStorage.setItem('picPath', dataResult.result.picPath);
        // localStorage.setItem('picPath', GlobalUrl.URL_HOST1 + dataResult.result.picPath);
        this.navCtrl.setRoot('TabsPage',{ 'accountType': this.data.key });
      }
      else if (dataResult.status == '-1') {
        this.toast.showToast('账号未注册');
      }
      else if (dataResult.status == '0'){
        this.toast.showToast('密码错误');
      }
      else if (dataResult.status == '-2'){
        this.toast.showToast('数据库连接发生错误');
      }
    };
  }

  public logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toast.showToast('请输入手机号');

    } else if (password.value.length == 0) {
      this.toast.showToast('请输入密码');
      
    } else {
      console.log("POST ==> login.do");
      let body = {
        'telnumber': username.value,
        'password': password.value,
        'userType': this.data.key
      };
      this.username = username.value;
      console.log(body);
      // this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_LOGIN, body, { successCallback: this.successCallback });
      this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_LOGIN, body, { successCallback : this.successCallback});
    } 
  }

  public cutdown(username: HTMLInputElement) {
    username.value = username.value.replace(/[^\d]/g, '');
  }

  public register() {
    // this.navCtrl.push(VisitCtrlModuleRegisterPage);
    this.modalCtrl.create('VisitCtrlModuleRegisterPage').present();
  }

  public chekFun(i) {
    console.log('i = ', i);
    let me = this;
    this.list.forEach(function (data, index, array) {
      if (i == index) {
        data.chek = true;
        me.data = data;
      } else {
        data.chek = false
      }
    });

  }

  public editpassword() {
    // this.navCtrl.push(VisitCtrlModuleEditpasswordPage); 
    this.modalCtrl.create('VisitCtrlModuleEditpasswordPage').present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleLoginPage');
  }

  ionViewWillUnload(){
    console.log('ionViewWillUnload VisitCtrlModuleLoginPage');
  }
}
