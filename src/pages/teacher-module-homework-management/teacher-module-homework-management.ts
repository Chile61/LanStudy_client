import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleHomeworkManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-management',
  templateUrl: 'teacher-module-homework-management.html',
})
export class TeacherModuleHomeworkManagementPage {
  homework_list: Homework[] = [];

  getHomeworkSuccessCallback: (res: Response) => void;
  deleteSuccessCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController, public navParams: NavParams, private network: ClientNetworkService
    , public events: Events) {

    this.getHomeworkSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      this.homework_list = dataResult.result;
      //(new Date()).Format("yyyy-M-d")
    }

    this.deleteSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<string>>(res.json()));
      let temp = [];
      for (let i = 0; i < this.homework_list.length; i++) {

        if (this.homework_list[i].check != true) {

          temp.push(this.homework_list[i]);
        }
      }
      this.homework_list = temp;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkManagementPage');
    this.events.subscribe('update', () => {
      this.getHomework();
    })
    this.getHomework();
  }

  ionViewWillUnload() {
    this.events.unsubscribe('update');
  }

  getHomework() {
    let body = {
      'teacherId': localStorage.getItem('userId'),
      'classId': localStorage.getItem('curClassId')
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CLASS_HOMEWORKS, body, { successCallback: this.getHomeworkSuccessCallback });

  }
  // getHomework() {
  //   let body = {
  //     "teacherId": "201430613253", //localStorage.getItem('userId'),
  //     "classId": "10001" //localStorage.getItem('curClassId')
  //   }

  //   this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CLASS_HOMEWORKS, body, { successCallback: this.getHomeworkSuccessCallback });

  // }

  homeworkClick() {

  }

  homeworkAssign() {
    this.modalCtrl.create('TeacherModuleHomeworkAssignPage').present();
  }

  delete() {
    let homework_ids: string[] = [];
    for (let i = 0; i < this.homework_list.length; i++) {
      if (this.homework_list[i].check == true) {
        homework_ids.push(this.homework_list[i].homeworkId);
      }
    }
    let body = {
      'homework_id': homework_ids
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_DELETE_HOMEWORKS, body, { successCallback: this.deleteSuccessCallback });
  }
}
class Homework {
  public homeworkId: string;
  public name: string;
  public createTime: string;
  public score?: string;
  public rank?: string;
  public commitNum?: string;
  public totalNum?: string;
  public check?: boolean;

}

// class Homework{
//     public paperId: string;
//     public paperName: string;
//     public assignTime: string;
//     public submitNumber: number;   
//     public studentNumber: number;  

//     public check?: boolean;       
// }