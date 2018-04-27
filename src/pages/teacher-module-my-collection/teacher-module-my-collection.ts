import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Collection } from '../../utils/collection';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleMyCollectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-my-collection',
  templateUrl: 'teacher-module-my-collection.html',
})
export class TeacherModuleMyCollectionPage {
	collection_list:Collection[];
  successCallback:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
  	this.collection_list=[];
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Collection>>>(res.json());
      if (dataResult.status == "1") {
        this.collection_list = dataResult.result;
      }
    }   		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleMyCollectionPage');
    this.getCollectionListFromServer();  
  }

  getCollectionListFromServer(){
    let body = {
      'teacher_id': localStorage.getItem('userId'),
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_COLLECTION, body, { successCallback: this.successCallback })   
  	// for (let i = 0; i < 7; i++) {
  	// 	let collection:Collection=new Collection();
  	// 	collection.name="我的收藏"+i;
  	// 	this.collection_list.push(collection)
  	// }  	
  }

}
