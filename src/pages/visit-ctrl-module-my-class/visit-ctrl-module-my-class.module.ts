import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitCtrlModuleMyClassPage } from './visit-ctrl-module-my-class';

@NgModule({
  declarations: [
    VisitCtrlModuleMyClassPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleMyClassPage),
  ],
})
export class VisitCtrlModuleMyClassPageModule {}
