import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the VisitCtrlMouduleRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-register',
  templateUrl: 'visit-ctrl-module-register.html',
})
export class VisitCtrlModuleRegisterPage {
  private successCallback: (res: Response) => void;
  private getVerifyCodeSuccessCallback: (res: Response) => void;
  list = [
    { "key": "1", "value": '学生端', "chek": true },
    { "key": "2", "value": '教师端', "chek": false },
    { "key": "3", "value": '家长端', "chek": false }
  ];

  data = { "key": "1", "value": '学生端', "chek": true };

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private network: ClientNetworkService, private toast: ClientToastService, public http: Http) {
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<LoginInfo>>(res.json());
      console.log("dataResult = ", dataResult);
      if (dataResult.status == "1") {
        console.log("result = ", dataResult.result);
        localStorage.setItem('userType', this.data.key);
        localStorage.setItem('userId', dataResult.result.id);
        localStorage.setItem('picPath', GlobalUrl.URL_HOST1 + dataResult.result.picPath);
        this.modalCtrl.create('TabsPage', { 'accountType': this.data.key }).present();
      }
      else if (dataResult.status == '-3') {
        this.toast.showToast( '验证码过期')
      }
      else if (dataResult.status == '-1') {
        this.toast.showToast( '验证码不匹配')
      }
      else if (dataResult.status == '-2') {
        this.toast.showToast( '数据库连接发生错误')
      }
    };

    this.getVerifyCodeSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Object>>(res.json());
      if (dataResult.status == "-1") {
        this.toast.showToast( '账号已被注册');
      }
      else if (dataResult.status == "-2") {
        this.toast.showToast( '服务器连接数据库发生错误');
      }
      else if (dataResult.status == "1") {
        this.toast.showToast( '获取成功，验证码为000000');
      }
    }
  }

  public register(username: HTMLInputElement, nickname: HTMLInputElement, password: HTMLInputElement, verifycode: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toast.showToast( '请输入手机号');
    } else if (password.value.length == 0) {
      this.toast.showToast( '请输入密码');
    } else if (verifycode.value.length == 0) {
      this.toast.showToast( '请输入验证码');
    } else if (nickname.value.length == 0) {
      this.toast.showToast( '请输入昵称');
    } else {
      console.log("POST ==> register.do");
      let body = {
        'telnumber': username.value,
        'nickname': nickname.value,
        'password': password.value,
        'userType': this.data.key,
        'verifyCode': verifycode.value
      };
      console.log(body);
      this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_SINGUP, body, { successCallback: this.successCallback });
    }
  }

  public cutdown(username: HTMLInputElement) {
    username.value = username.value.replace(/[^\d]/g, '');
  }

  public getVerify(telnumber: HTMLInputElement) {
    this.toast.showToast('验证码已经发送到你的手机，请注意查收');

    let body = {
      'telnumber': telnumber.value,
      'userType': this.data.key
    };
    console.log('body = ', body);
    this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_GET_VERIFY, body, { successCallback: this.getVerifyCodeSuccessCallback });
  }

  public logIn() {
    this.modalCtrl.create('VisitCtrlModuleLoginPage').present();
  }

  public chekFun(i) {
    let me = this;
    this.list.forEach(function (data, inde, array) {
      if (i == inde) {
        data.chek = true;
        me.data = data;
      } else {
        data.chek = false
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleRegisterPage');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload VisitCtrlModuleRegisterPage');
  }
}
