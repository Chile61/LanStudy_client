import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { Schedule } from '../../utils/Schedule';
import { ScheduleDaily } from '../../utils/ScheduleDaily';
import { date } from '../../utils/date';
import { TimeManagerModuleScheduleAddPage } from '../time-manager-module-schedule-add/time-manager-module-schedule-add';
import { TimeManagerModuleScheduleDailyInfoPage } from '../time-manager-module-schedule-daily-info/time-manager-module-schedule-daily-info'
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Http, Headers, Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';
/**
 * Generated class for the TimeManagerModuleScheduleInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-manager-module-schedule-info',
  templateUrl: 'time-manager-module-schedule-info.html',
})
export class TimeManagerModuleScheduleInfoPage {
  userId: String;  //继承父页面的学生Id
  token: String;      //继承父页面的学生token
  ScheduleList: Array<Schedule>;     //日程表数组
  ScheduleDailyList:Array<ScheduleDaily>; //每日日程表数组


  dayNameList: Array<date>;

  pushPage: any;
  ScheduleGetCallBack:(res:Response) => void    //获取日程表回调函数
  constructor(public modalCtrl :ModalController ,public navCtrl: NavController, public navParams: NavParams , private network: ClientNetworkService) {
    console.log("1");
   
    this.ScheduleGetCallBack = (res:Response) => {
      let dataResult = (<DataResult<Array<Schedule>>>(res.json()));
      if( dataResult.status == "1")
      this.ScheduleList = dataResult.result;
    }
   
    /*this.ScheduleDailyList = [     //default
      {
        startTime: "7:00",
        endTime: "8:00",
        ScheduleContext: "背单词"
      },
      {
        startTime: "8:00",
        endTime: "9:00",
        ScheduleContext: "听听力"
      },
      {
        startTime: "9:00",
        endTime: "10:00",
        ScheduleContext: "微课一"
      },
      {
        startTime: "10:00",
        endTime: "11:00",
        ScheduleContext: "复习错题"
      }
    ];

    this.ScheduleList = [                 //default
      {
        year: 2018,
        month: 4,
        day: 6,
        dayName: "星期五",
        ScheduleDailyList: this.ScheduleDailyList
      },
      {
        year: 2018,
        month: 4,
        day: 7,
        dayName: "星期六",
        ScheduleDailyList: this.ScheduleDailyList
      },
      {
        year: 2018,
        month: 4,
        day: 8,
        dayName: "星期日",
        ScheduleDailyList: this.ScheduleDailyList
      },
      {
        year: 2018,
        month: 4,
        day: 9,
        dayName: "星期一",
        ScheduleDailyList: this.ScheduleDailyList
      },
      {
        year: 2018,
        month: 4,
        day: 10,
        dayName: "星期二",
        ScheduleDailyList: this.ScheduleDailyList
      },
    ]
*/
    this.dayNameList = [
      {
        month: 4,
        day: 6,
        dayName: "星期五"
      },
      {
        month: 4,
        day: 7,
        dayName: "星期六"
      },
      {
        month: 4,
        day: 8,
        dayName: "星期日"
      },
      {
        month: 4,
        day: 9,
        dayName: "星期一"
      },
      {
        month: 4,
        day: 10,
        dayName: "星期二"
      },
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeManagerModuleScheduleInfoPage');
    this.userId=this.navParams.get('userId');
    this.token=this.navParams.get('token');
    let body ={
      'userId':this.userId,
      'token':this.token
    }
    // alert(this.userId);
    // alert(this.token);
    this.network.postRequest(GlobalUrl.URL_TIME_MANAGER_MODULE_SCHEDULE_GET,body,{successCallback: this.ScheduleGetCallBack});
  }

  JumpToScheduleDaily(index: number) {
    console.log(index);
    
    this.modalCtrl.create('TimeManagerModuleScheduleDailyInfoPage',{
      'month':this.ScheduleList[index].month,
      'day':this.ScheduleList[index].day,
      'dayName':this.ScheduleList[index].dayName,
      'ScheduleDailyList':this.ScheduleList[index].ScheduleDailyList
    }).present();
  }

  JumpToScheduleAdd() {
    this.modalCtrl.create('TimeManagerModuleScheduleAddPage', {
      'userId': this.userId ,
      'token':this.token,
      'type': 'TimeManagerModuleScheduleAdd'
    }).present();
  }



}
