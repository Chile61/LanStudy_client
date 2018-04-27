import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerModulePostPage } from './answer-module-post';

@NgModule({
  declarations: [
    AnswerModulePostPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerModulePostPage),
  ],
})
export class AnswerModuleQuestionPageModule {}
