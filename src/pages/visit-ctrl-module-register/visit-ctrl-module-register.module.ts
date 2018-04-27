import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleRegisterPage } from './visit-ctrl-module-register';

@NgModule({
  declarations: [
    VisitCtrlModuleRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleRegisterPage),
  ],
})
export class VisitCtrlModuleRegisterPageModule {}
