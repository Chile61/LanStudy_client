import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController, Events, InfiniteScroll } from 'ionic-angular';
import { Post } from '../../utils/post';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientLoadingService } from '../../services/client-loading.service';
import { ClientNetworkService } from '../../services/client-network.service';

/**
 * Generated class for the AnswerModuleHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer-module-home',
  templateUrl: 'answer-module-home.html',
})
export class AnswerModuleHomePage {
  posts: Array<Post>;
  userId: string;
  lastPostIdx: number;
  successCallback: (res: Response) => void;

  constructor(public modalCtrl: ModalController,
    public navParams: NavParams,
    public events: Events,
    private loading: ClientLoadingService,
    private network: ClientNetworkService) {

    this.userId = (localStorage.getItem('userId'));
    this.posts = new Array<Post>();
    this.lastPostIdx = 0;

    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Post>>>(res.json());
      if(dataResult.result){
        console.log('result = ', dataResult.result);        
        this.posts = this.posts.concat(dataResult.result);
        this.lastPostIdx = this.posts.length;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerModuleHomePage');
    this.loading.showLoading('正在加载...');
    this.getPosts(this.lastPostIdx);
  }


  doInfinite(infiniteScroll) {
    console.log('正在获取其他帖子');
    this.getPosts(this.lastPostIdx, infiniteScroll);
  }

  getPosts( lastPostIdx: number, infiniteScroll?: InfiniteScroll) {
    let body = {
      'lastPostIdx': lastPostIdx
    };

    this.network.postRequest(GlobalUrl.URL_ANSWER_MODULE_GET_POSTS, body, { successCallback: this.successCallback, infiniteScroll: infiniteScroll });
  }

  onPostClick(id: string) {
    let post = this.posts.find((q) => q.postId == id);
    console.log("post = ", post);

    this.modalCtrl.create('AnswerModulePostPage', { 'post': post }).present();
  }

  onPublishBtnClick() {
    this.events.subscribe('post:update', () => {
      this.updatePost();
      this.events.unsubscribe('post:update');
    })

    let modal = this.modalCtrl.create('AnswerModulePublishPage');
    modal.present();
  }


  updatePost() {
    console.log('update post');
    this.loading.showLoading('正在加载...');
    this.getPosts(this.lastPostIdx);
  }
}
