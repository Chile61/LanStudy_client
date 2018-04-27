import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherModuleMyCollectionPage } from './teacher-module-my-collection';

@NgModule({
  declarations: [
    TeacherModuleMyCollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherModuleMyCollectionPage),
  ],
})
export class TeacherModuleMyCollectionPageModule {}
