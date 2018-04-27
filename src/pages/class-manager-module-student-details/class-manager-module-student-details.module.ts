import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassManagerModuleStudentDetailsPage } from './class-manager-module-student-details';

@NgModule({
  declarations: [
    ClassManagerModuleStudentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassManagerModuleStudentDetailsPage),
  ],
})
export class ClassManagerModuleStudentDetailsPageModule {}
