import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleStudentsMyPage } from './visit-ctrl-module-students-my';
import { VisitCtrlModuleEditprofilePage }from'../visit-ctrl-module-editprofile/visit-ctrl-module-editprofile'

@NgModule({
  declarations: [
    VisitCtrlModuleStudentsMyPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleStudentsMyPage),
  ],
})
export class VisitCtrlModuleStudentsMyPageModule {}
