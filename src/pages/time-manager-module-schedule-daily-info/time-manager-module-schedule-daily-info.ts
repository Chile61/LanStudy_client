import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Schedule } from '../../utils/Schedule';
import { ScheduleDaily } from '../../utils/ScheduleDaily';
import { date } from '../../utils/date';
import { TimeManagerModuleScheduleInfoPage } from '../time-manager-module-schedule-info/time-manager-module-schedule-info';

/**
 * Generated class for the TimeManagerModuleScheduleDailyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-manager-module-schedule-daily-info',
  templateUrl: 'time-manager-module-schedule-daily-info.html',
})
export class TimeManagerModuleScheduleDailyInfoPage {
  private month: number;
  private day: number;
  private dayName: string;
  ScheduleDailyList: Array<ScheduleDaily>;
  dayList: date;


  constructor(public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.month = this.navParams.get('month');
    this.day = this.navParams.get('day');
    this.dayName = this.navParams.get('dayName');
    this.dayList = {
      day: this.day,
      month: this.month,
      dayName: this.dayName
    }

    console.log(this.dayList);
    this.ScheduleDailyList = this.navParams.get('ScheduleDailyList');
    console.log(this.ScheduleDailyList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeManagerModuleScheduleDailyInfoPage');
  }

}
