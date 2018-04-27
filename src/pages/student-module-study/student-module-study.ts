import { Component } from '@angular/core';
import { IonicPage, NavParams, ModalController } from 'ionic-angular';
/**
 * Generated class for the StudentModuleStudyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-module-study',
  templateUrl: 'student-module-study.html',
})
export class StudentModuleStudyPage {

  constructor(public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModuleStudyPage');
  }

  onScheduleBtnClick(){
    this.modalCtrl.create('TimeManagerModuleScheduleInfoPage',{
      'tip':"",
      'type':""
    }).present();
  }

  onHomeworkBtnClick(){
    this.modalCtrl.create('StudentModuleStudyExercisePage').present();
    // this.modalCtrl.create('ObjectiveQModuleExercisePage').present();
  }

  onPracticeBtnClick(){
    
  }

  onWrongBookBtnClick(){
    this.modalCtrl.create('WrongQModuleSelectPage').present();
  }

  onNetLessonBtnClick(){
    
  }
}
