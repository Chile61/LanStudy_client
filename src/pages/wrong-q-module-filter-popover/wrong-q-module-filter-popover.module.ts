import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleFilterPopoverPage } from './wrong-q-module-filter-popover';

@NgModule({
  declarations: [
    WrongQModuleFilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleFilterPopoverPage),
  ],
})
export class WrongQModuleFilterPopoverPageModule {}
