import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
import { ClientLoadingService } from '../../services/client-loading.service';

/**
 * Generated class for the AnswerModulePublishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-module-publish',
  templateUrl: 'answer-module-publish.html',
})
export class AnswerModulePublishPage {

  successCallback: (res: Response) => void;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private network: ClientNetworkService,
    private toast: ClientToastService,
    private loading: ClientLoadingService
  ) {
    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<{}>>(res.json()));
      console.log('result = ', dataResult.result);
      if (dataResult.status=="1") {

        this.navCtrl.pop().then(() => {
          this.events.publish('post:update', 'myMsg');
        });
      }
      else {
        this.toast.showToast( '发送失败，请稍后再试');
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerModulePublishPage');
  }


  onPublishBtnClick(title: HTMLInputElement, content: HTMLTextAreaElement, grade: HTMLSelectElement, subject: HTMLSelectElement) {
    if (title.value.length <= 0) {
      this.toast.showToast( '标题不能为空');
    }
    else if (content.value.length <= 0) {
      this.toast.showToast( '内容不能为空');
    }
    else if (grade.value.length <= 0) {
      this.toast.showToast( '请在上方下拉框选择年级');
    }
    else if (subject.value.length <= 0) {
      this.toast.showToast( '请在上方下拉框选择科目');
    }
    else {
      let studentId = localStorage.getItem('userId');
      let gradeId = '11';
      let subejctId = '1';
      console.log(grade.value);
      console.log(subject.value);
      this.publishPost(studentId, title.value, content.value, gradeId, subejctId);
    }


  }

  publishPost(studentId:string, title: string, content: string, gradeId: string, subjectId: string) {
    this.loading.showLoading('正在发送...');
    let body = {
      'postTitle': title,
      'postContent': content,
      'studentId':studentId,
      'gradeId': gradeId,
      'picPath': null,
      'postSubject': subjectId
    };

    this.network.postRequest(GlobalUrl.URL_ANSWER_MODULE_PUBLISH, body, { successCallback: this.successCallback });
  }

}
