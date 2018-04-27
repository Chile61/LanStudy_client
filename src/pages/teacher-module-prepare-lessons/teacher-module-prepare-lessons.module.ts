import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModulePrepareLessonsPage } from './teacher-module-prepare-lessons';

@NgModule({
  declarations: [
    TeacherModulePrepareLessonsPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModulePrepareLessonsPage),
  ],
})
export class TeacherModulePrepareLessonsPageModule {}
