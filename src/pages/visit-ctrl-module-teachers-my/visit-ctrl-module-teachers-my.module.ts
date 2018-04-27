import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleTeachersMyPage } from './visit-ctrl-module-teachers-my';

@NgModule({
  declarations: [
    VisitCtrlModuleTeachersMyPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleTeachersMyPage),
  ],
})
export class VisitCtrlModuleTeachersMyPageModule {}
