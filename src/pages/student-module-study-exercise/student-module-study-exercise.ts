import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StudentModuleStudySubjectiveQuestionPage } from '../student-module-study-subjective-question/student-module-study-subjective-question'
import { StudentModuleStudyObjectiveQuestionPage } from '../student-module-study-objective-question/student-module-study-objective-question'
import { Http, Response, Headers } from '@angular/http'
import { StudentPaper } from '../../utils/student-paper'
import { DataResult } from '../../utils/data-result'
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the StudentModuleStudyExercisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-module-study-exercise',
  templateUrl: 'student-module-study-exercise.html',
})
export class StudentModuleStudyExercisePage {
  //初始默认选择unfinished
  question: string = "unfinished";
  unFinishedPaper: Array<StudentPaper>;
  finishedPaper: Array<StudentPaper>;
  objective: number[];
  subjective: number[];
  getUnfinshedSuccessCallback: (res: Response) => void;
  getFinshedSuccessCallback: (res: Response) => void;

  //构造函数
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private network: ClientNetworkService) {
    this.objective = [0, 1, 2, 3, 4, 5,];
    this.subjective = [7, 8, 9, 10];
    this.getUnfinshedSuccessCallback = (res: Response) => {
      // 将返回的JSON字符串数据转换为指定的数据结构
      let dataResult = <DataResult<Array<StudentPaper>>>(res.json());
      this.unFinishedPaper = dataResult.result;
      console.log(this.unFinishedPaper);
    }
    this.getFinshedSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<StudentPaper>>>(res.json());
      this.finishedPaper = dataResult.result;
      console.log(this.finishedPaper);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModuleStudyExercisePage');
    this.getUnFinishedPaper('');
    this.getFinishedPaper('');
  }

  goToPaperPage(n: number) {
    switch (n) {
      case 1:
        this.navCtrl.push('StudentModuleStudyObjectiveQuestionPage', { 'data': this.objective });
        break;
      case 2:
        this.navCtrl.push('StudentModuleStudySubjectiveQuestionPage', { 'dataSub': this.subjective });
        break;
    }

  }

  getUnFinishedPaper(studentId: string) {
    if (this.network.debugMode) {
      let body = {
        'studentId': studentId
      };
      let url = GlobalUrl.URL_STUDENT_MODULE_GET_UNFINSHED_HOMEWORK;
      let options = { successCallback: this.getUnfinshedSuccessCallback }
      this.network.postRequest(url, body, options);
    }
    else {
      this.getPapers(studentId, "0", this.getUnfinshedSuccessCallback);
    }
  }

  getFinishedPaper(studentId: string) {
    if (this.network.debugMode) {
      let body = {
        'studentId': studentId
      };
      let url = GlobalUrl.URL_STUDENT_MODULE_GET_FINSHED_HOMEWORK;
      let options = { successCallback: this.getFinshedSuccessCallback }
      this.network.postRequest(url, body, options);
    }
    else {
      this.getPapers(studentId, "1", this.getFinshedSuccessCallback);
    }

  }

  getPapers(studentId: string, submit: string, success) {
    let body = {
      'studentId': studentId,
      'submit': submit
    };
    let url = GlobalUrl.URL_STUDENT_MODULE_GET_PAPERS;
    let options = { successCallback: success }
    this.network.postRequest(url, body, options);
  }
}
