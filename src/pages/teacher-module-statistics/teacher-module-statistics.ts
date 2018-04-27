import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';

/**
 * Generated class for the TeacherModuleStatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-statistics',
  templateUrl: 'teacher-module-statistics.html',
})
export class TeacherModuleStatisticsPage {
	statistic_list :Statistic[];
  successCallback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
  	this.statistic_list=[];
    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Statistic>>>(res.json()));
      this.statistic_list = dataResult.result;
    }    
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleStatisticsPage');
    this.getStatisticsFromServer();
  }
  getStatisticsFromServer(){
    // for (let i = 0; i < 10; i++) {
    //   let statistic=new Statistic();
    //   statistic.name="作业"+i;
    //   statistic.time=0;
    //   this.statistic_list.push(statistic);
    // }  	
    let body = {
      'teacher_id': localStorage.getItem('userId'),
      'class_id': localStorage.getItem('curClassId')
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_STATISTICS, body, { successCallback: this.successCallback });    
  }
  statisticsDetail(name:string,time:string,id:string){
    this.navCtrl.push('TeacherModuleStatisticsDetailPage', {homework_name : name,homework_time:time,paper_id:id});
  }

}
class Statistic{
	paper_name:string;
  paper_id:string;
	paper_time:string;
}