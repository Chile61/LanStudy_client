import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the WrongQModuleAddQuestionSecondPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-add-question-second',
  templateUrl: 'wrong-q-module-add-question-second.html',
})
export class WrongQModuleAddQuestionSecondPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleAddQuestionSecondPage');
  }
  
  prev(){
  	this.navCtrl.pop();
  }

  quit(){
  	this.navCtrl.setRoot('WrongQModuleMainPage');
  }

  next(){
  	this.navCtrl.push('WrongQModuleAddQuestionThirdPage');
  }

}
