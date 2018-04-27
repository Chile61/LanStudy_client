import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleHomePage } from './parent-module-home';

@NgModule({
  declarations: [
    ParentModuleHomePage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleHomePage),
  ],
})
export class ParentModuleHomePageModule {}
