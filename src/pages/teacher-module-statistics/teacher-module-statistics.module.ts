import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleStatisticsPage } from './teacher-module-statistics';

@NgModule({
  declarations: [
    TeacherModuleStatisticsPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleStatisticsPage),
  ],
})
export class TeacherModuleStatisticsPageModule {}
