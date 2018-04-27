import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Student } from '../../utils/student';

/**
 * Generated class for the ClassManagerModuleStudentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-class-manager-module-student-details',
  templateUrl: 'class-manager-module-student-details.html',
})
export class ClassManagerModuleStudentDetailsPage {
  curStudent: Student;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.curStudent = new Student();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassManagerModuleStudentDetailsPage');
    this.curStudent = this.navParams.get('curStudent');
    console.log('this.student = ', this.curStudent);
  }

  
}
