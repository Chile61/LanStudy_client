import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleStorePage } from './parent-module-store';

@NgModule({
  declarations: [
    ParentModuleStorePage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleStorePage)
  ],
})
export class ParentModuleStorePageModule {}
