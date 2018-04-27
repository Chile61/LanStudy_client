import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the WrongQModuleAddQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-add-question',
  templateUrl: 'wrong-q-module-add-question.html',
})
export class WrongQModuleAddQuestionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleAddQuestionPage');
  }

  next(){
  	this.navCtrl.push('WrongQModuleAddQuestionSecondPage');
  }

  quit(){
  	this.navCtrl.pop();
  }
}
