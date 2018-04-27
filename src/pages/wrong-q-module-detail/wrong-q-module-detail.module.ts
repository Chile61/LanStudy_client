import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleDetailPage } from './wrong-q-module-detail';

@NgModule({
  declarations: [
    WrongQModuleDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleDetailPage),
  ],
})
export class WrongQModuleDetailPageModule {}
