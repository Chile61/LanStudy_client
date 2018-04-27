import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
/**
 * Generated class for the VisitCtrlMouduleEditpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-editpassword',
  templateUrl: 'visit-ctrl-module-editpassword.html',
})
export class VisitCtrlModuleEditpasswordPage {
  list = [{ "key": "1", "value": '学生端', "chek": true }, { "key": "2", "value": '教师端', "chek": false }, { "key": "3", "value": '家长端', "chek": false }];
  data = { "key": "1", "value": '学生端', "chek": true };

  private successCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController, public http: Http, public navParams: NavParams , private network: ClientNetworkService, private toast:ClientToastService) {
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<LoginInfo>>(res.json());
      if (dataResult.status == "1") {
        console.log(dataResult);
        this.toast.showToast( '修改成功');
        this.modalCtrl.create('VisitCtrlModuleLoginPage').present();
      }
      else {
        this.toast.showToast( '验证码错误');
        
      }
    }
  }

  public edit(username: HTMLInputElement, password: HTMLInputElement, verifycode: HTMLInputElement) {
    if (username.value.length == 0) {
      this.toast.showToast( '请输入手机号');

    } else if (password.value.length == 0) {
      this.toast.showToast( '请输入新密码');

    } else if (verifycode.value.length == 0) {
      this.toast.showToast( '请输入验证码');
      
    } else {
      console.log("POST ==> editpassword.do");
      let body = {
        'telnumber': username.value,
        'password': password.value,
        'usertype': this.data.key,
        'verifycode': verifycode.value
      };
      console.log(body);

      this.network.postRequest(GlobalUrl.URL_VISIT_MODULE_UPDATE_PASSWORD, body, { successCallback: this.successCallback });
    }
  }
  public cutdown(username: HTMLInputElement) {
    username.value = username.value.replace(/[^\d]/g, '');
  }

  public getVerify() {
    this.toast.showToast( '验证码已经发送到你的手机，请注意查收');
    
  }

  public register() {
    // this.navCtrl.push(VisitCtrlModuleLoginPage);
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
    console.log('ionViewDidLoad VisitCtrlModuleEditpasswordPage');
  }

  ionViewWillUnload(){
    console.log('ionViewWillUnload VisitCtrlModuleEditpasswordPage');
  }
}
