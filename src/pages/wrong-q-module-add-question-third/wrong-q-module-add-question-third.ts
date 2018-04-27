import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the WrongQModuleAddQuestionThirdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-add-question-third',
  templateUrl: 'wrong-q-module-add-question-third.html',
})
export class WrongQModuleAddQuestionThirdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleAddQuestionThirdPage');
  }
  prev(){
  	this.navCtrl.pop();
  }
  quit(){
  	this.navCtrl.setRoot('WrongQModuleMainPage');
  }
  complete(){
    this.navCtrl.setRoot('WrongQModuleMainPage');
  }

}
