import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TeacherModuleHomeworkCorrectingViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-correcting-view',
  templateUrl: 'teacher-module-homework-correcting-view.html',
})
export class TeacherModuleHomeworkCorrectingViewPage {
  homework_name: string;//下个页面要显示的作业名字
  homework_id: string;
  student_list: Student[];
  successCallback: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService
    , public events: Events) {
    this.homework_name = navParams.get('homework_name');
    this.homework_id = navParams.get('homework_id');
    this.student_list = [];
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Student>>>(res.json());
      if (dataResult.status == "1") {
        for (let i = 0; i < dataResult.result.length; i++) {
          if (dataResult.result[i].corrected_box == true) {
            dataResult.result[i].correct = "已批改";
          }
          else {
            dataResult.result[i].correct = "未批改";
          }
        }
        this.student_list = dataResult.result;

      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkCorrectingViewPage');
    this.events.subscribe('update', () => {
      this.getStudentFromServer();
    })
    this.getStudentFromServer();
  }

  ionViewWillUnload() {
    this.events.unsubscribe('update');
  }

  getStudentFromServer() {
    let body = {
      'teacher_id': localStorage.getItem('userId'),
      'homework_id': this.homework_id,
    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_CORRECT_STUDENT, body, { successCallback: this.successCallback })

  }

  homeworkCorrectDetail(homework_name, student_name, student_id) {
    this.navCtrl.push('TeacherModuleHomeworkCorrectingDetailPage', { homework_name: homework_name, student_name: student_name, homework_id: this.homework_id, student_id: student_id });

  }
}
class Student {
  student_name: string;
  student_id: string;
  choice_score: number;
  total_score: number;
  corrected_box: boolean;
  correct: string;

}
