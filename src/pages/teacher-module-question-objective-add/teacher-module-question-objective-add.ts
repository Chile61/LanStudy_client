import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the TeacherModuleQuestionObjectiveAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-question-objective-add',
  templateUrl: 'teacher-module-question-objective-add.html',
})
export class TeacherModuleQuestionObjectiveAddPage {
  subject_id: string;
  title_content: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  successCallback: (res: Response) => void;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ClientToastService, private network: ClientNetworkService) {
    this.subject_id = navParams.get('subject_id');
    this.title_content = "";
    this.option_a = "";
    this.option_b = "";
    this.option_c = "";
    this.option_d = "";
    this.answer = "";

    this.successCallback = (res: Response) => {
      // let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      // this.homework_list = dataResult.result;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleQuestionObjectiveAddPage');
  }
  complete() {
    // teacher_id localStorage.getItem('userId')
    // title_content  this.title_content
    // option_a this.option_a
    // option_b this.option_b
    // option_c this.option_c
    // option_d this.option_d
    // answer this.answer
    // pic（可选）
    // subject_id this.subject_id
    // grade 1
    if (this.answer == "") {
      this.toast.showToast('请选择参考答案！');
      return;
    }
    if (this.title_content == "") {
      this.toast.showToast('请输入题目！');
      return;
    }
    if (this.option_a == "") {
      this.toast.showToast('请输入选项A内容！');
      return;
    }
    if (this.option_b == "") {
      this.toast.showToast('请输入选项B内容！');
      return;
    }
    if (this.option_c == "") {
      this.toast.showToast('请输入选项C内容！');
      return;
    }
    if (this.option_d == "") {
      this.toast.showToast('请输入选项D内容！');
      return;
    }


  }
}
