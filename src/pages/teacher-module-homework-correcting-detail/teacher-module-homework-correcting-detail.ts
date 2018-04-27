import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleHomeworkCorrectingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-correcting-detail',
  templateUrl: 'teacher-module-homework-correcting-detail.html',
})
export class TeacherModuleHomeworkCorrectingDetailPage {
	homework_name:string;
  homework_id:string;
	student_name:string;
  student_id:string;
	exercise_list:Exercise[];

  getExerciseSuccessCallback:any;
  correctSuccessCallback:any;
	curIdx:number;
  curScore:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private network: ClientNetworkService
  ) {
  	this.homework_name=navParams.get('homework_name');
    this.homework_id=navParams.get('homework_id');
  	this.student_name=navParams.get('student_name');
    this.student_id=navParams.get('student_id');
    this.exercise_list = [{correctImgSrc:'./assets/imgs/correct-default.png',exercise_content:'',exercise_id:'',exercise_score:0,student_answer:''}];
    this.curIdx=0;
    this.curScore = 0;
    this.getExerciseSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Exercise>>>(res.json());
      if (dataResult.status == "1") {
        console.log('exercise:',dataResult.result);
        this.exercise_list = dataResult.result;
        this.exercise_list.forEach(element => {
          element.correctImgSrc = './assets/imgs/correct-default.png';
        });
        this.curIdx=0;
      }
    }

    this.correctSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<string>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result=="1") {
          this.navCtrl.pop().then(()=>{
          this.events.publish('update');
          });
        }
      }
    }

    this.events.subscribe('correct:complete', (url)=>{
      this.exercise_list[this.curIdx].correctImgSrc = url;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkCorrectingDetailPage');
    this.getExerciseFromServer();
  }

  ionViewWillUnload(){
    this.events.unsubscribe('correct:complete');
  }

  getExerciseFromServer(){  
    let body = {
      'teacher_id': localStorage.getItem('userId'),
      'homework_id': this.homework_id,
      'student_id': this.student_id
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CORRECT_STUDENT_DETAIL, body, { successCallback: this.getExerciseSuccessCallback })
  }

  nextQuestion(){
  	if (this.curIdx<this.exercise_list.length-1){
  		this.curIdx=this.curIdx+1;
  	}
  }

  preQuestion(){
  	if (this.curIdx>0){
  		this.curIdx=this.curIdx-1;
  	}
  }

  complete(){
     let body = {
      'teacher_id': localStorage.getItem('userId'),
      'homework_id': this.homework_id,
      'student_id': this.student_id,
      'exercise':  this.exercise_list
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_CORRECT, body, { successCallback: this.correctSuccessCallback })      
  }  

  studentAnswer(){
    this.navCtrl.push('TeacherModuleHomeworkCorrectingCanvasPage')
  }
}

class Exercise{
  exercise_id:string;
  exercise_content:string;
  exercise_score:number;
  student_answer:string;
  correctImgSrc:string;
}