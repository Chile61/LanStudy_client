import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, Events } from 'ionic-angular';
import { Post } from '../../utils/post';
import { Answer } from '../../utils/answer';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';
import { ClientToastService } from '../../services/client-toast.service';

/**
 * Generated class for the AnswerModuleQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-module-post',
  templateUrl: 'answer-module-post.html',
})
export class AnswerModulePostPage {
  curques: Post;
  answerList: Array<Answer>;
  studentId: string;
  token: string;

  getAnswerSuccessCallback: (res: Response) => void;
  likeAnswerSuccessCallback: (res: Response) => void;
  likeAnswerErrorCallback: () => void;


  constructor(
    public navCtrl: ModalController,
    public navParams: NavParams,
    public events: Events,
    private network: ClientNetworkService,
    private loading: ClientLoadingService,
    private toast: ClientToastService
  ) {

    this.curques = this.navParams.get('post');
    console.log('curques', this.curques);
    this.studentId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');

    this.getAnswerSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Answer>>>(res.json()));
      this.answerList = dataResult.result;
      if (this.answerList) {
        this.answerList.forEach(element => {
          if (element.atStudentId && element.atStudentId.length > 0) {
            element.atStudentId = '@' + element.atStudentId + '：';
          }
        });
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerModuleQuestionPage');
    this.getAnswers(this.curques.postId);

  }

  updateAnswer() {
    this.getAnswers(this.curques.postId);
  }

  onLikeBtnClick(answer: Answer) {
    if (answer.isLike) {
      this.toast.showToast('你已经点过赞了');
    }
    else {
      answer.isLike = true;
      this.likeAnswer(answer);

    }
  }

  onCommentBtnClick(answerId?: string) {

    this.events.subscribe('answer:update', () => {
      this.updateAnswer();
      this.events.unsubscribe('answer:update');
    })

    console.log('answerId = ', answerId);
    let isComment = false;
    let targetId = this.curques.postId;
    if (answerId) {
      isComment = true;
      targetId = answerId;

    }

    let modal = this.navCtrl.create('AnswerModuleCommentPage',
      {
        'targetId': targetId,
        'isComment': isComment,
      }
    );
    modal.present();
  }

  getAnswers(postId: string) {
    this.loading.showLoading();

    let body = {
      'postId': postId
    };

    this.network.postRequest(GlobalUrl.URL_ANSWER_MODULE_GET_ANSWERS, body, { successCallback: this.getAnswerSuccessCallback });
  }

  likeAnswer(answer: Answer) {
    let body = {
      'answerId': answer.answerId
    };

    this.likeAnswerSuccessCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Answer>>>(res.json()));
      console.log('result = ', dataResult.result);
      if (dataResult.status == "1") {
        this.toast.showToast('点赞成功');
        let a = parseInt(answer.likes);
        answer.likes = a++ + '';
      }
      else {
        this.toast.showToast('点赞失败');
        answer.isLike = false;
      }
    }

    this.likeAnswerErrorCallback = () => {
      this.toast.showToast('点赞失败');
      answer.isLike = false;
    }

    this.network.postRequest(GlobalUrl.URL_ANSWER_MODULE_LIKE_ANSWER, body, { successCallback: this.likeAnswerSuccessCallback, failureCallback: this.likeAnswerErrorCallback });

  }

}
