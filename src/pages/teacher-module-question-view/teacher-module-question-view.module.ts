import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleQuestionViewPage } from './teacher-module-question-view';

@NgModule({
  declarations: [
    TeacherModuleQuestionViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleQuestionViewPage),
  ],
})
export class TeacherModuleQuestionViewPageModule {}
