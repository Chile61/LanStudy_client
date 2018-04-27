import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { WrongQModuleMainPage } from '../wrong-q-module-main/wrong-q-module-main';
 
/**
 * Generated class for the WrongQModuleSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-select',
  templateUrl: 'wrong-q-module-select.html',
})
export class WrongQModuleSelectPage {
  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleSelectPage');

  }
  selectSubject(subjectName: string) {
    console.log(subjectName);
    //进入对应科目的页面
    this.modalCtrl.create('WrongQModuleMainPage', { subject: subjectName }).present();
  }
}

