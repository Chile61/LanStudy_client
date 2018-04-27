import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Events } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';

/**
 * Generated class for the WrongQModuleMainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-main',
  templateUrl: 'wrong-q-module-main.html',
})
export class WrongQModuleMainPage {
  subject: string;
  order_type: string;
  question_list: Array<Question>;
  QUESTION_TYPE: string[];
  successCallback: any;

  constructor(public modalCtrl: ModalController, private network: ClientNetworkService, public navCtrl: NavController, public popoverCtrl: PopoverController, public navParams: NavParams,public events: Events) {
    this.subject = navParams.get('subject');
    this.QUESTION_TYPE = ["客观题", "主观题"];
    this.question_list = [];
    this.successCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Question>>>(res.json());
      if (dataResult.status == "1") {
        console.log(dataResult.result);
        this.question_list = dataResult.result;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleMainPage');
    this.getQuestionList();
    this.events.subscribe('filter-change', (start_date, end_date) => {
      this.filter(start_date, end_date);
    })    
    
  }
  ionViewWillUnload(){
    this.events.unsubscribe('filter-change');
  }
  onOrderChange(type: string) {//排列顺序改变
    this.order_type = type
  }

  getQuestionList() {//从服务器获取错题列表
    let body = {
      'id': localStorage.getItem('id'),
      'subjectName': "数学"
    }

    this.network.postRequest(GlobalUrl.URL_WRONG_Q_MODULE_GET_WRONG_QUESTIONS, body, {successCallback: this.successCallback});
  }

  createFilter(myEvent) {
    let popover = this.popoverCtrl.create('WrongQModuleFilterPopoverPage', { main_page: this });
    popover.present({ ev: myEvent });
  }

  filter(start_date, end_date) {

  }

  addQuestion() {
    let modal = this.modalCtrl.create('WrongQModuleAddQuestionPage');
    modal.present();
  }
  clickItem(question_id){
    this.navCtrl.push('WrongQModuleDetailPage',{question_id:question_id});
  }
}

class Question{
    questionId:string;
    questionName:string;
    questionTypeId:string;
    check?:boolean;
    public point?: number;
}