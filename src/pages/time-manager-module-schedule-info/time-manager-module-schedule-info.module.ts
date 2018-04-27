import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeManagerModuleScheduleInfoPage } from './time-manager-module-schedule-info';

@NgModule({
  declarations: [
    TimeManagerModuleScheduleInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeManagerModuleScheduleInfoPage),
  ],
})
export class TimeManagerModuleScheduleInfoPageModule {}
