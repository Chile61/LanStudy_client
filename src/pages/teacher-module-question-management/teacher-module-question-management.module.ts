import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleQuestionManagementPage } from './teacher-module-question-management';

@NgModule({
  declarations: [
    TeacherModuleQuestionManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleQuestionManagementPage),
  ],
})
export class TeacherModuleQuestionManagementPageModule {}
