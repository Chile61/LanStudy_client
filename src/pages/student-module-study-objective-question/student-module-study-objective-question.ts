import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { StudentQuestion } from '../../utils/student-question'
import { DataResult } from '../../utils/data-result'
import { GlobalUrl } from '../../utils/global-url';
import { Http, Response, Headers } from '@angular/http'
import { PaperInfo } from '../../utils/paperInfo'
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
@IonicPage()
@Component({
  selector: 'page-student-module-study-objective-question',
  templateUrl: 'student-module-study-objective-question.html',
})
export class StudentModuleStudyObjectiveQuestionPage {
  //初始化选项ABCD
  A: boolean;
  B: boolean;
  C: boolean;
  D: boolean;
  a: string = "<p>this is param</p>";
  //客观题序号
  objective: number[];
  currentId: number;
  curSubjective: number;
  numberOfQuestion: number;
  studentQuestion: StudentQuestion;
  studentQuestionList: Array<StudentQuestion>;
  checkstatus: boolean;
  getObjectivePaperCallback: (res: Response) => void;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private network: ClientNetworkService,
    private toast: ClientToastService
  ) {

    if (localStorage.getItem('curObjective'))
      this.curSubjective += parseInt(localStorage.getItem('curObjective'), 10);
    else
      this.curSubjective = 1;
    this.numberOfQuestion = 6;
    this.currentId = 1;
    this.objective = this.navParams.get('data');
    console.log(this.currentId, this.navParams.get('data'));
    this.studentQuestionList = PaperInfo.question;
    this.studentQuestion = this.studentQuestionList[this.objective[this.currentId - 1]];
    this.numberOfQuestion = 6;
    //this.studentQuestion.text=this.return2Br(this.studentQuestion.text);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModuleStudyObjectiveQuestionPage');
  }

  presentPopover() {
    console.log("success");
    let popover = this.popoverCtrl.create(StudentModuleStudyObjectiveQuestionPage);
    popover.present();
  }

  //提交问题
  submitQuestion() {
    console.log(this.A, this.B, this.C, this.D);
    this.studentQuestionList[this.objective[this.currentId - 1]].isFinished = true;
    PaperInfo.question[this.objective[this.currentId - 1]].isFinished = true;
    console.log(this.studentQuestionList[this.currentId].isFinished);
    this.checkstatus = false;
    //localStorage.setItem('objective',this.currentId.toString());
  }

  nextQuestion() {
    if (this.currentId < this.numberOfQuestion) {
      this.currentId++;
      console.log(this.currentId);
      this.studentQuestion = this.studentQuestionList[this.objective[this.currentId - 1]];
      this.checkstatus = false;
      console.log(this.checkstatus);
    }
    else {
      this.warnEnd();
    }
  }

  preQuestion() {
    if (this.currentId > 1) {
      this.currentId--;
      console.log(this.currentId);
      this.studentQuestion = this.studentQuestionList[this.objective[this.currentId - 1]];
      this.checkstatus = false;
      //this.studentQuestion.text = this.return2Br(this.studentQuestionList[this.currentId - 1].text);
    }
    else {
      this.warnFirst();
      // this.navCtrl.push('StudentModuleStudyExercisePage');
    }
  }

  warnFirst() {
    this.toast.showToast( '已经是第一题','top');
    // let alert = this.alertCtrl.create({
    //   title: '警告',
    //   subTitle: "已经是第一题",
    //   buttons: ['OK']
    // });
    // alert.present();

  }
  warnEnd() {
    let alert = this.alertCtrl.create({
      title: '警告',
      subTitle: "已经是最后一题",
      buttons: ['提交']
    });
    alert.present();
  }
  // return2Br(str:string){
  //return str.replace(/\n/g,"<br/>");
  //}
}
