import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the TeacherModulePrepareLessonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-prepare-lessons',
  templateUrl: 'teacher-module-prepare-lessons.html',
})
export class TeacherModulePrepareLessonsPage {
	tabRoots: Object[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
    this.tabRoots = [
      {
        root: 'TeacherModuleTeachingpptPage',
        tabTitle: '教学PPT'
      },
      {
        root: 'TeacherModuleMyCollectionPage',
        tabTitle: '我的收藏'
      }
    ];   	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModulePrepareLessonsPage');
     
  }

}
