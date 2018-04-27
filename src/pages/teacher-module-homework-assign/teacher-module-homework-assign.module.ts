import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleHomeworkAssignPage } from './teacher-module-homework-assign';

@NgModule({
  declarations: [
    TeacherModuleHomeworkAssignPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleHomeworkAssignPage),
  ],
})
export class TeacherModuleHomeworkAssignPageModule {}
