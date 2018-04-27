import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StudentModuleStudyQuestionListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-module-study-question-list',
  templateUrl: 'student-module-study-question-list.html',
})
export class StudentModuleStudyQuestionListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModuleStudyQuestionListPage');
  }

}
