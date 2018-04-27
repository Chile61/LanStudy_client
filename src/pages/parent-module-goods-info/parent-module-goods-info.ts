import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Goods } from '../../utils/goods';

/**
 * Generated class for the ParentModuleGoodsInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parent-module-goods-info',
  templateUrl: 'parent-module-goods-info.html',
})
export class ParentModuleGoodsInfoPage {
  goods: Goods;
  goodsType: string;
  detail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.goods = navParams.get('goods');
    this.goodsType = navParams.get('type');
    this.detail = 'brief';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentModuleGoodsInfoPage');
  }

}
