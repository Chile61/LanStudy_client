import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Class } from '../../utils/class';
import { Subject } from '../../utils/subject';
import { Question } from '../../utils/question';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { Homework } from '../../utils/homework';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the TeacherModuleHomeworkAssignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-homework-assign',
  templateUrl: 'teacher-module-homework-assign.html',
})
export class TeacherModuleHomeworkAssignPage {
  class: string;
  subject: string;

  cur_classid: string;
  cur_subjectid: string;
  // teaching_material: string;
  myClassList: Array<Class>;
  mySubjectList: Array<Subject>;
  myQuestionList: Array<Question>;

  // question_list: Question[];

  getSubjectsuccessCallback: any;
  getQuestionsuccessCallback: any;
  assignSuccessCallback: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public events: Events,
    private network: ClientNetworkService,
    private toast: ClientToastService
  ) {
    // this.question_list = [];
    this.myClassList = new Array<Class>();
    this.myQuestionList = new Array<Question>();

    // this.getSubjectsuccessCallback = (res: Response) => {
    //   let dataResult = <DataResult<Array<Subject>>>(res.json());
    //   if (dataResult.status == "1") {
    //     this.mySubjectList=dataResult.result;
    //   }
    // }
    this.getQuestionsuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Question>>>(res.json());
      if (dataResult.status == "1") {
        this.myQuestionList = dataResult.result;
      }
    }
    this.assignSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<string>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result == "1") {
          this.toast.showToast('布置完毕');
          this.navCtrl.pop().then(() => {
            this.events.publish('update');
          });
        }

      }
    }
    this.mySubjectList = [{ name: "语文", subjectId: "1" }, { name: "数学", subjectId: "2" }, { name: "英语", subjectId: "3" }];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleHomeworkAssignPage');
    this.myClassList = GlobalUserInfo.Instance.get('MyClassList');
  }

  // getSubjectFromServer(class_id:string) {

  //   let body = {
  //     'teacher_id': localStorage.getItem('userId'),
  //     'class_id':   class_id,
  //   }
  //   this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_ASSIGN_DETAIL_2, body, this.getSubjectsuccessCallback)

  // }
  getQuestionFromServer(class_id: string, subject_id: string) {
    let body = {
      'subject_id': subject_id,

    }
    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_GET_ASSIGN_DETAIL_3, body, { successCallback: this.getQuestionsuccessCallback })
  }
  homeworkName() {
    let flag = false;
    let flag2 = true;
    for (let i = 0; i < this.myQuestionList.length; i++) {
      if (this.myQuestionList[i].check == true) {
        flag = true;
        if (this.myQuestionList[i].point == null || this.myQuestionList[i].point <= 0) {
          flag2 = false;
          break;
        }
      }

    }
    if (!flag) {
      this.toast.showToast('请至少选择一道题目！');
      return;
    }
    if (!flag2) {
      this.toast.showToast('所选题目分值输入非法！');
      return;
    }

    let alert1 = this.alertCtrl.create({
      title: '请设置本次作业名称与截止日期',
      inputs: [
        {
          name: 'name',
          placeholder: '作业名'
        },
        {
          name: 'deadline',
          placeholder: '截止日期 20180413-19:30'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {
            let date: Date = this.checkTimeFormat(data.deadline);
            if (data.name == "") {
              this.toast.showToast('请为本次作业命名');
              return false;
            }
            if (data.name.length > 30) {
              this.toast.showToast('抱歉，作业名字过长');
              return false;
            }
            if (date == null) {
              this.toast.showToast('抱歉，截止日期非法（格式:20180413-19:30）');
              return false;
            }
            else {
              this.homeworkAssign(data.name, date.getTime())

            }
          }
        }
      ]
    });
    alert1.present();
  }
  homeworkAssign(name, time) {
    let question_id = [];
    for (let i = 0; i < this.myQuestionList.length; i++) {
      if (this.myQuestionList[i].check == true) {
        question_id.push(this.myQuestionList[i].questionId);
      }
    }
    let body = {
      'teacher_id': localStorage.getItem('userId'),
      'class_id': this.cur_classid,
      'question_id': question_id,
      'paper_name': name,
      'subject_id': this.cur_subjectid,
      'deadline': time

    }

    this.network.postRequest(GlobalUrl.URL_TEACHER_MODULE_ASSIGN, body, { successCallback: this.assignSuccessCallback })

  }
  checkTimeFormat(time) {
    if (time == "") return null;
    if (time.length != 14) return null;
    let date_regex = /(20[0-9]{2})(1[0-2]|0[1-9])(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])/;
    let res = date_regex.test(time);
    if (res) {
      let ymd = time.match(/(\d{4})(\d{2})(\d{2})-(\d{2}):(\d{2})/);
      let year = parseInt(ymd[1]);
      let month = parseInt(ymd[2]);
      let day = parseInt(ymd[3]);
      let hour = parseInt(ymd[4]);
      let min = parseInt(ymd[5]);
      if (day > 28) {
        //获取当月的最后一天
        let lastDay = new Date(year, month, 0).getDate();
        if (lastDay < day) return null;
      }
      let str: string = ymd[1] + "/" + ymd[2] + "/" + ymd[3] + " " + ymd[4] + ":" + ymd[5];
      let date = new Date(str);
      return date;
    }
    return null;


    // let date=new Date();
    // date.setDate() 设置 Date 对象中月的某一天 (1 ~ 31)。
    // setMonth()  设置 Date 对象中月份 (0 ~ 11)。
    // setFullYear() 设置 Date 对象中的年份（四位数字）。
    // setYear() 请使用 setFullYear() 方法代替。
    // setHours()  设置 Date 对象中的小时 (0 ~ 23)。
    // setMinutes()


  }
  curClassChange(name: string) {
    this.myClassList.forEach(ele => {
      if (ele.className == name) {
        this.cur_classid = ele.classId;
        if (this.cur_subjectid != null) {
          this.getQuestionFromServer(this.cur_classid, this.cur_subjectid);
        }
        // this.getSubjectFromServer(ele.classId);
      }
    });
  }
  curSubjectChange(name: string) {
    this.mySubjectList.forEach(ele => {
      if (ele.name == name) {
        this.cur_subjectid = ele.subjectId;
        if (this.cur_classid != null) {
          this.getQuestionFromServer(this.cur_classid, this.cur_subjectid);
        }
      }
    });
  }

  refresh() {
    // for (let i = this.myQuestionList.length - 1; i >= 0; i--) {
    //   this.myQuestionList[i].check = false;
    // }
    if (this.cur_classid != null && this.cur_subjectid != null) {
      this.getQuestionFromServer(this.cur_classid, this.cur_subjectid);
    }
  }
  totalCheck() {
    for (let i = this.myQuestionList.length - 1; i >= 0; i--) {
      this.myQuestionList[i].check = true;
    }
  }

  clickItem(question_id, event) {

    if (event.target.hasChildNodes()) {
      this.navCtrl.push('TeacherModuleQuestionViewPage', { question_id: question_id });
    }

  }


}

