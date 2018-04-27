import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WrongQModuleResolutionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-resolution',
  templateUrl: 'wrong-q-module-resolution.html',
})
export class WrongQModuleResolutionPage {
  question_id:any;
  question_type:any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question_id = navParams.get('question_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleResolutionPage');
    this.getQuestionResolutionFromServer();
  }

  getQuestionResolutionFromServer(){
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
