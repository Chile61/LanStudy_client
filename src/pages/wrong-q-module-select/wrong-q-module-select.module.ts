import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleSelectPage } from './wrong-q-module-select';

@NgModule({
  declarations: [
    WrongQModuleSelectPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleSelectPage),
  ],
})
export class WrongQModuleSelectPageModule {}
