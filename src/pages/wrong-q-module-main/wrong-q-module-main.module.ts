import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleMainPage } from './wrong-q-module-main';

@NgModule({
  declarations: [
    WrongQModuleMainPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleMainPage),
  ],
})
export class WrongQModuleMainPageModule {}
