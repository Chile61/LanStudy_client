import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
import { ClientLoadingService } from '../../services/client-loading.service';

/**
 * Generated class for the AnswerModuleCommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-module-comment',
  templateUrl: 'answer-module-comment.html',
})
export class AnswerModuleCommentPage {

  studentId: string;
  token: string;
  targetId: string;
  targetName: string;
  title: string;
  isComment: boolean;
  successCallback: (res: Response) => void;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    private network: ClientNetworkService,
    private toast: ClientToastService,
    private loading: ClientLoadingService) {

    this.studentId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.targetId = this.navParams.get('targetId');
    this.isComment = this.navParams.get('isComment');
    this.targetName = this.navParams.get('targetName');

    console.log('targetId:', this.targetId);
    
    if (this.isComment) {
      this.title = '评论'
    }
    else {
      this.title = '回答问题'
    }


    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<boolean>>(res.json()));
      if (dataResult.status == '1') {
        this.navCtrl.pop().then(() => {
          this.events.publish('answer:update');
        });
      }
      else {
        toast.showToast('发送失败，请稍后再试');
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerModuleCommentPage');
  }

  onSendBtnClick(textarea: HTMLTextAreaElement) {
    if (textarea.value.length > 0) {
      this.loading.showLoading('正在发送');
      console.log('postId = ', this.targetId);
      console.log('content = ', textarea.value);
      this.sendComment(this.studentId, this.targetId, this.targetName, textarea.value);
    }
    else {
      this.toast.showToast('内容不能为空')
    }
  }

  sendComment(studentId: string,targetId: string, targetName: string, content: string) {
    let body = {
      'userId': studentId,
      'postId': targetId,
      'atStudentName': targetName,
      'answerContent': content,
    };
    
    this.network.postRequest(GlobalUrl.URL_ANSWER_MODULE_SEND_COMMENT, body, {successCallback:this.successCallback});
  }

}
