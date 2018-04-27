import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
 
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
/**
 * Generated class for the TeacherModuleQuestionViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-question-view',
  templateUrl: 'teacher-module-question-view.html',
})
export class TeacherModuleQuestionViewPage {
	successCallback: (res: Response) => void;
  question_id:any;
  question_type:any;
	question:Question;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.question_id = navParams.get('question_id');
    this.question_type = navParams.get('question_type');
    this.successCallback = (res: Response) => {
      // let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      // this.homework_list = dataResult.result;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleQuestionViewPage');
    this.getQuestionFromServer();
  }
  getQuestionFromServer(){
  	
  	this.question=new Question();
    if (this.question_type==null) this.question_type='1';
  	if (this.question_type=='1'){//sub
			document.getElementById("obj").style.display="none";
			document.getElementById("sub").style.display="inline";
  	}
  	else if (this.question_type=='2'){
			document.getElementById("sub").style.display="none";
			document.getElementById("obj").style.display="inline";
  	}

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