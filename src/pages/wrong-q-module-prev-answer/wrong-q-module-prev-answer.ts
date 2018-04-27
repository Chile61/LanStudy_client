import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WrongQModulePrevAnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-prev-answer',
  templateUrl: 'wrong-q-module-prev-answer.html',
})
export class WrongQModulePrevAnswerPage {
  question_id:any;
  question_type:any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question_id = navParams.get('question_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModulePrevAnswerPage');
    this.getPrevAnswerFromServer()
  }
  getPrevAnswerFromServer(){
    this.question_type='1';
    if (this.question_type=='1'){//sub
      document.getElementById("obj_module").style.display="none";
      document.getElementById("sub_module").style.display="inline";
    }
    else if (this.question_type=='2'){
      document.getElementById("sub_module").style.display="none";
      document.getElementById("obj_module").style.display="inline";
    }  
  }

}
