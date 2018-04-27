import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleHomeworkCorrectingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-correcting',
  templateUrl: 'teacher-module-homework-correcting.html',
})
export class TeacherModuleHomeworkCorrectingPage {
	homework_list:Homework[];
	successCallback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
  	this.homework_list=[];
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Homework>>>(res.json());
      if (dataResult.status == "1") {
        this.homework_list = dataResult.result;
      }
    }   	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkCorrectingPage');
    this.getHomeworkFromServer();
  }

  getHomeworkFromServer(){
    let body = {
      'teacher_id': localStorage.getItem('userId'),
      'class_id':localStorage.getItem('curClassId')
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CORRECT, body,{ successCallback: this.successCallback })  
  }
  homeworkCorrect(name,id){
  	this.navCtrl.push('TeacherModuleHomeworkCorrectingViewPage',{homework_name:name,homework_id:id});
  }

}
class Homework{
	homework_id:string;
	homework_name:string;
	homework_time:string;
	unsubmitted_number:number;
	submitted_number:number;
  //废弃
	// uncorrected_number:number; 
	// corrected_number:number; 
}