import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
/**
 * Generated class for the TeacherModuleQuestionSubjectivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-question-subjective',
  templateUrl: 'teacher-module-question-subjective.html',
})
export class TeacherModuleQuestionSubjectivePage {
	question_list:Question[];
  deleteItemSuccessCallback: (res: Response) => void;
  getSubjectiveSuccessCallback: (res: Response) => void;
  subject_id:string;  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public modalCtrl: ModalController) {
    this.subject_id = navParams.get('subject_id');

    this.deleteItemSuccessCallback = (res: Response) => {
      // let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      // this.homework_list = dataResult.result;
    }
    this.getSubjectiveSuccessCallback = (res: Response) => {
      // let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      // this.homework_list = dataResult.result;
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleQuestionSubjectivePage');
    this.getSubjectiveFromServer();
  }
  deleteItem(question_id){
  	//TODO 改成向后台请求
  	for ( let i = 0; i < this.question_list.length; i++) {
  		if (this.question_list[i].question_id == question_id){
  			this.question_list.splice(i,1) ;
  			break;
  		}
			
  	}
  }
  clickItem(question_id){
    this.modalCtrl.create('TeacherModuleQuestionViewPage', { question_id: question_id,question_type:'1'}).present();
  }
  getSubjectiveFromServer(){
    //参数 teacher_id:localStorage.getItem('userId') question_type:2 subject_id:this.subject_id
  	this.question_list=[];
  	for ( let i = 0; i < 10; i++) {
  		let question=new Question();
  		question.question_id=i+"";
			question.question_time=1;
			question.title_content="图片";	
			this.question_list.push(question)
  	}
  }  
}
class Question{
	question_id:string;
	title_content:string;
  //废弃
  question_time:number;   
}
