import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WrongQModuleDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-detail',
  templateUrl: 'wrong-q-module-detail.html',
})
export class WrongQModuleDetailPage {

  question_type:any;
  question:Question;
  question_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.question_id = navParams.get('question_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleDetailPage');
    this.getQuestionFromServer();
  }
  getQuestionFromServer(){
    this.question_type='1';
    if (this.question_type=='1'){//sub
      document.getElementById("obj").style.display="none";
      document.getElementById("sub").style.display="inline";
    }
    else if (this.question_type=='2'){
      document.getElementById("sub").style.display="none";
      document.getElementById("obj").style.display="inline";
    }
  }
  submitAnswer(){
    if (this.question_type=='1'){//sub
      document.getElementById("sub_answer").style.display="inline";
    }
    else if (this.question_type=='2'){
      document.getElementById("obj_answer").style.display="inline";
    }   
    document.getElementById("submit").style.display="none"; 
  }
  deleteQuestion(){

  }
  viewResolution(){
    this.navCtrl.push('WrongQModuleResolutionPage',{question_id:this.question_id});
  }
  prevAnswer(){
    this.navCtrl.push('WrongQModulePrevAnswerPage',{question_id:this.question_id});
  }
  viewNotes(){
    this.navCtrl.push('WrongQModuleNotePage',{question_id:this.question_id});
  }

}
class Question{
  question_type:string;
  title_content:string;
  option_a:string;
  option_b:string;
  option_c:string;
  option_d:string;
  answer:string;  
  pic?:string;
}
