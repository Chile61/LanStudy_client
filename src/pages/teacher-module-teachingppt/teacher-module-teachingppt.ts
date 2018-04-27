import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ppt } from '../../utils/ppt';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleTeachingpptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-teachingppt',
  templateUrl: 'teacher-module-teachingppt.html',
})
export class TeacherModuleTeachingpptPage {
	ppt_list:Ppt [];
  successCallback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Ppt>>>(res.json());
      if (dataResult.status == "1") {
        this.ppt_list = dataResult.result;
      }
    }  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleTeachingpptPage');
    this.getPPTListFromServer();
  }
  getPPTListFromServer(){
    let body = {
      'teacher_id': localStorage.getItem('userId'),
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_PPT, body, { successCallback: this.successCallback })    
  	// for (let i = 0; i < 7; i++) {
  	// 	let ppt:Ppt=new Ppt();
  	// 	ppt.name="PPT"+i;
  	// 	this.ppt_list.push(ppt)
  	// }

  }
}
