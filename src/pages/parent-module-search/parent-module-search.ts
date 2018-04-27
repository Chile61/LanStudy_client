import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Goods } from '../../utils/goods';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';

/**
 * Generated class for the ParentModuleSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-module-search',
  templateUrl: 'parent-module-search.html',
})
export class ParentModuleSearchPage {
  // @ViewChild('content') content: Content;
  lessonList: Array<Goods>;
  teacherList: Array<Goods>;
  goods: string = "lesson"
  successCallback: (res: Response) => void;
  teacherSuccessCallback: (res: Response) => void;
  lessonSuccessCallback: (res: Response) => void;
  private parentId: string;
  private token: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService, private loading: ClientLoadingService) {
    this.parentId = localStorage.getItem('parentId');
    this.token = localStorage.getItem('token');

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
    console.log('ionViewDidLoad ParentModuleSearchPage');
  }

  onSearchBtnClick(keyword: HTMLInputElement) {
    console.log(this.goods);
    let url: string;
    if (this.goods == "lesson")
      url = GlobalUrl.URL_PARENT_MODULE_SEARCH_NET_LESSON;
    else if (this.goods == "teacher")
      url = GlobalUrl.URL_PARENT_MODULE_SEARCH_NET_TEACHER;

    if (keyword.value.length > 0)
      this.getGoodsList(url, this.token, this.parentId, keyword.value);
  }


  getGoodsList(url: string, token: string, parentId: string, keyword: string) {
    this.loading.showLoading();

    let body = {
      'parentId': parentId,
      'token': token,
      'keyword': keyword
    };


    if (url == GlobalUrl.URL_PARENT_MODULE_SEARCH_NET_LESSON)
      this.network.postRequest(url, body, { successCallback: this.lessonSuccessCallback });
    else if (url == GlobalUrl.URL_PARENT_MODULE_SEARCH_NET_TEACHER)
      this.network.postRequest(url, body, { successCallback: this.teacherSuccessCallback });
    else
      console.log('Wrong url : ', url);

  }

}
