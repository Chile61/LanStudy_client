import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentModuleStudyExercisePage } from './student-module-study-exercise';

@NgModule({
  declarations: [
    StudentModuleStudyExercisePage,
  ],
  imports: [
    IonicPageModule.forChild(StudentModuleStudyExercisePage),
  ],
})
export class StudentModuleStudyExercisePageModule {}
