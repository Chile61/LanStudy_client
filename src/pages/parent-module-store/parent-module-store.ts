import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Refresher, ModalController } from 'ionic-angular';
import { Response } from '@angular/http';
import { Goods } from '../../utils/goods';
import { GlobalUrl } from '../../utils/global-url';
import { Content } from 'ionic-angular/navigation/nav-interfaces';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';
/**
 * Generated class for the ParentModuleStorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-module-store',
  templateUrl: 'parent-module-store.html',
})
export class ParentModuleStorePage {
  NORMAL_COLOR: string = "#0099FF";
  isNetLessonBtnOn: boolean = true;
  userId: string;
  successCallback: (res: Response) => void;

  // cardList: Array<Goods>;
  @ViewChild('content') content: Content;
  lessonList: Array<Goods>;
  teacherList: Array<Goods>;
  parcitceList: Array<Goods>;

  curGoodsType: string = "lesson";

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private network: ClientNetworkService, private loading: ClientLoadingService) {
    this.userId = localStorage.getItem('userId');
    this.lessonList = new Array<Goods>();
    this.teacherList = new Array<Goods>();
    this.parcitceList = new Array<Goods>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentModuleStorePage');
    let keyword = '数学';

    this.loading.showLoading();
    this.getGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_NET_TEACHER, this.userId, keyword);
    this.getGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_NET_LESSON, this.userId, keyword);
  }

  onSearchBtnClick() {
    this.modalCtrl.create('ParentModuleSearchPage').present();
  }

  doRefresh(refresher) {
    console.log('正在获取其他精品');
    if (this.curGoodsType == "lesson")
      this.getGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_NET_LESSON, this.userId, '数学', refresher);
    else if (this.curGoodsType == "teacher")
      this.getGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_NET_TEACHER, this.userId, '数学', refresher);
    else if (this.curGoodsType == "practice")
      this.getGoodsList(GlobalUrl.URL_PARENT_MODULE_GET_NET_LESSON, this.userId, '数学', refresher);
  }

  getGoodsList(url: string, userId: string, keyword: string, refresher?: Refresher) {
    let body = {
      'userId': userId,
      'keyword': keyword
    };

    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Goods>>>(res.json()));

      if (dataResult.status == "1") {
        if (url == GlobalUrl.URL_PARENT_MODULE_GET_NET_TEACHER) {
          this.teacherList = this.teacherList.concat(dataResult.result);
        }
        else {
          this.lessonList = this.lessonList.concat(dataResult.result);
        }
      }

    }

    this.network.postRequest(url, body, { successCallback: this.successCallback, refresher: refresher });
  }

  onGoodsClick(card, type: string) {
    console.log(type, ' = ', card);
    this.modalCtrl.create('ParentModuleGoodsInfoPage', { 'goods': card, 'type': type }).present();
  }

  onShoppingCartBtnClick() {
    this.modalCtrl.create('ParentModuleShoppingCartPage').present();
  }
}
