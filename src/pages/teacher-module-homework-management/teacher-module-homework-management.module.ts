import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleHomeworkManagementPage } from './teacher-module-homework-management';

@NgModule({
  declarations: [
    TeacherModuleHomeworkManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleHomeworkManagementPage),
  ],
})
export class TeacherModuleHomeworkManagementPageModule {}
