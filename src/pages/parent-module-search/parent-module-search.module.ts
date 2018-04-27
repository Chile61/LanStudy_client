import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentModuleSearchPage } from './parent-module-search';

@NgModule({
  declarations: [
    ParentModuleSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(ParentModuleSearchPage),
  ],
})
export class ParentModuleSearchPageModule {}
