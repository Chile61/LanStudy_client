import { NgModule } from '@angular/core';
import { IonicPageModule,ItemSliding, ToastController } from 'ionic-angular';
import { VisitCtrlModuleMyChildPage } from './visit-ctrl-module-my-child';
import { Component, ViewEncapsulation } from '@angular/core';

@NgModule({
  declarations: [
    VisitCtrlModuleMyChildPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitCtrlModuleMyChildPage),
  ],
})
export class VisitCtrlModuleMyChildPageModule {}
