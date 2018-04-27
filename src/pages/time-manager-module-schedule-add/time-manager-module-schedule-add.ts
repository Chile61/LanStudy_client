import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,DateTime,ModalController} from 'ionic-angular';
import { Content } from 'ionic-angular/navigation/nav-interfaces';

import { Http, Headers, Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
// import { GlobalUserInfo } from '../../utils/global-user-info';
import { GlobalUrl } from '../../utils/global-url';
import { ScheduleAddMsg } from '../../utils/ScheduleAddMsg';
import { TimeManagerModuleScheduleInfoPage}from '../time-manager-module-schedule-info/time-manager-module-schedule-info'
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TimeManagerModuleScheduleAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-manager-module-schedule-add',
  templateUrl: 'time-manager-module-schedule-add.html',
})
export class TimeManagerModuleScheduleAddPage {
  msgList:Array<ScheduleAddMsg>;
  public Date = {
    year:"2018",
    month:"4",
    day:"3",
 
  }

  public startTime= {
    time:"19:00"
  }

  public endTime={
    time:"19:00"
  }

  private userId: String;
  private token: String;
  ScheduleAddMsg:String;

 ScheduleAddMsgCallBack:(res:Response) =>void
  constructor(public navCtrl: NavController, public navParams: NavParams,  
   public modalCtrl:ModalController , private network: ClientNetworkService) {
     
    this.userId=this.navParams.get('userId');
    this.token=this.navParams.get('token');
     this.ScheduleAddMsgCallBack = (res: Response) => {
      let dataResult = (<DataResult<String>>(res.json()));
      if (dataResult.status == "1")
        this.ScheduleAddMsg = dataResult.result;
    }
 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad BuildEventPage');
 } 
 
 ScheduleAdd(url:string,token:String,userId:String,ScheduleContext:String,Date:object,
  startTime:object,endTime:object){        //事件内容
  
 //console.log(this.Date);
 //console.log(this.startTime);
 //console.log(this.endTime);
 
  let date = Date.toString();          //获取日期
  let timeArray=date.split('-');            //分割日期
  let stT=startTime.toString();     //获取事件开始时间
  let endT =endTime.toString() ;   //获取事件结束事件
  let body={
    'userId':userId,
    'year':timeArray[0],
    'month':timeArray[1],
    'day':timeArray[2],
    'startTime':stT,
    'endTime':endT,
    'scheduleContext':ScheduleContext,
    'token':token
  }
  this.network.postRequest(url,body,{successCallback: this.ScheduleAddMsgCallBack});
 }

  //确定按钮点击事件
  ondateclick(title:HTMLInputElement){
    let url : string;
    console.log("1");
    url=GlobalUrl.URL_TIME_MANAGER_MODULE_SCHEDULE_ADD;
    console.log("2");
    if(title == null){alert("请输入事件内容"); }
    let ScheduleContext=title.value.toString();
    console.log(ScheduleContext);
    this.ScheduleAdd(url,this.token,this.userId,ScheduleContext,this.Date,this.startTime,this.endTime);
    alert(this.ScheduleAddMsg);
  }
  JumpToParentPage(){
    this.navCtrl.pop();
  }

}






