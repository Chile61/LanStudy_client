import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleHomeworkInfoPage } from './parent-module-homework-info';


@NgModule({
  declarations: [
    ParentModuleHomeworkInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleHomeworkInfoPage),
  ],
})
export class ParentModuleHomeworkInfoPageModule {}
