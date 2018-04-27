import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentModuleStudyQuestionListPage } from './student-module-study-question-list';

@NgModule({
  declarations: [
    StudentModuleStudyQuestionListPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentModuleStudyQuestionListPage),
  ],
})
export class StudentModuleStudyQuestionListPageModule {}
