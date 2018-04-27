import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleStatisticsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-statistics-detail',
  templateUrl: 'teacher-module-statistics-detail.html',
})
export class TeacherModuleStatisticsDetailPage {
	homework_name:string;
	homework_time:number;
	student_list:Student[];
  paper_id:string;
  successCallback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
  	this.homework_name=navParams.get('homework_name');
  	this.homework_time=navParams.get('homework_time');
    this.paper_id=navParams.get('paper_id');
    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Student>>>(res.json()));
      this.student_list = dataResult.result;
    }  	
  	this.student_list=[]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleStatisticsDetailPage');
    this.getStudentFromServer();
  }
  getStudentFromServer(){
  	// for (let i = 0; i < 30; i++) {
  	// 	let student=new Student();
  	// 	student.id="201401";
			// student.name="张三";
			// student.rank=1;
			// student.score=100;  
			// this.student_list.push(student);
  	// }
    let body = {
      'paper_id': this.paper_id
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_STATISTICS_DETAIL, body, { successCallback: this.successCallback });      
  }


}
class Student{
	student_num:string;
	student_name:string;
	score:number;
	rank:number;

}
