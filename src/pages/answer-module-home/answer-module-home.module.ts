import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnswerModuleHomePage } from './answer-module-home';

@NgModule({
  declarations: [
    AnswerModuleHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AnswerModuleHomePage),
  ],
})
export class AnswerModuleHomePageModule {}
