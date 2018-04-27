import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleStatisticsDetailPage } from './teacher-module-statistics-detail';

@NgModule({
  declarations: [
    TeacherModuleStatisticsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleStatisticsDetailPage),
  ],
})
export class TeacherModuleStatisticsDetailPageModule {}
