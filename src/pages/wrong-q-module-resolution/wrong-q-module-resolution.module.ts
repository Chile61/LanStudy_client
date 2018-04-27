import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleResolutionPage } from './wrong-q-module-resolution';

@NgModule({
  declarations: [
    WrongQModuleResolutionPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleResolutionPage),
  ],
})
export class WrongQModuleResolutionPageModule {}
