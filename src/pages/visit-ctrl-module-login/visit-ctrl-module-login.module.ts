import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleLoginPage } from './visit-ctrl-module-login';

@NgModule({
  declarations: [
    VisitCtrlModuleLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleLoginPage),
  ],
})
export class VisitCtrlModuleLoginPageModule {}
