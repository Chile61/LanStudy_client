import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerModuleCommentPage } from './answer-module-comment';

@NgModule({
  declarations: [
    AnswerModuleCommentPage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerModuleCommentPage),
  ],
})
export class AnswerModuleCommentPageModule {}
