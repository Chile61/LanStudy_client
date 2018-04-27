import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassManagerModuleClassInfoPage } from './class-manager-module-class-info';

@NgModule({
  declarations: [
    ClassManagerModuleClassInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassManagerModuleClassInfoPage),
  ],
})
export class ClassManagerModuleClassInfoPageModule {}
