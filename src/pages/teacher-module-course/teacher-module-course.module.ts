import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleCoursePage } from './teacher-module-course';

@NgModule({
  declarations: [
    TeacherModuleCoursePage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleCoursePage),
  ],
})
export class TeacherModuleCoursePageModule {}
