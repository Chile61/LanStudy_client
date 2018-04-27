import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeManagerModuleScheduleAddPage } from './time-manager-module-schedule-add';

@NgModule({
  declarations: [
    TimeManagerModuleScheduleAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeManagerModuleScheduleAddPage),
  ],
})
export class TimeManagerModuleScheduleAddPageModule {}
