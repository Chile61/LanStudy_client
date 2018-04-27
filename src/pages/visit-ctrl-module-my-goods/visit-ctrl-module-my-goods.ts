import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Content } from 'ionic-angular/navigation/nav-interfaces';
import { Goods } from '../../utils/goods';
import { Http, Headers, Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
// import { GlobalUserInfo } from '../../utils/global-user-info';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';
/**
 * Generated class for the VisitCtrlModuleMyGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-my-goods',
  templateUrl: 'visit-ctrl-module-my-goods.html',
})
export class VisitCtrlModuleMyGoodsPage {
  lessonList: Array<Goods>;
  teacherList: Array<Goods>;
  goods: string = "lesson"

  successCallback: (res: Response) => void;
  teacherSuccessCallback: (res: Response) => void;
  lessonSuccessCallback: (res: Response) => void;

  private userId: string;
  private token: string;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private network: ClientNetworkService, private loading: ClientLoadingService) {
    this.userId = localStorage.getItem('userId');

    this.teacherSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Goods>>>(res.json()));
      if (dataResult.status == "1")
        this.teacherList = dataResult.result;
    }

    this.lessonSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Goods>>>(res.json()));
      if (dataResult.status == "1")
        this.lessonList = dataResult.result;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleMyGoodsPage');

    this.getMyGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_MY_NET_LESSON, this.userId);
    this.getMyGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_MY_NET_TEACHER, this.userId);
  }

  getMyGoodsList(url: string, userId: string) {
    this.loading.showLoading();

    let body = {
      'userId': userId,
    };

    if (url == GlobalUrl.URL_PARENT_MODULE_GET_MY_NET_LESSON)
      this.network.postRequest(url, body, {successCallback: this.lessonSuccessCallback});
    else if (url == GlobalUrl.URL_PARENT_MODULE_GET_MY_NET_TEACHER)
      this.network.postRequest(url, body, {successCallback: this.teacherSuccessCallback});
    else
      console.log('Wrong url : ', url);

  }

  onGoodsClick(card, type: string) {
    console.log(type, ' = ', card);
    this.modalCtrl.create('ParentModuleGoodsInfoPage', { 'goods': card, 'type': type }).present();
  }
}
