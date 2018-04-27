import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleParentsMyPage } from './visit-ctrl-module-parents-my';

@NgModule({
  declarations: [
    VisitCtrlModuleParentsMyPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleParentsMyPage),
  ],
})
export class VisitCtrlModuleParentsMyPageModule {}
