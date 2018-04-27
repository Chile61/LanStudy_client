import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentModuleStudyPage } from './student-module-study';

@NgModule({
  declarations: [
    StudentModuleStudyPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentModuleStudyPage),
  ],
})
export class StudentModuleStudyPageModule {}
