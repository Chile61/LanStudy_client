import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongQModuleNotePage } from './wrong-q-module-note';

@NgModule({
  declarations: [
    WrongQModuleNotePage,
  ],
  imports: [
    IonicPageModule.forChild(WrongQModuleNotePage),
  ],
})
export class WrongQModuleNotePageModule {}
