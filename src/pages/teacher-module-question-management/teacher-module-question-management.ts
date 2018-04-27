import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

/**
 * Generated class for the TeacherModuleQuestionManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-question-management',
  templateUrl: 'teacher-module-question-management.html',
})
export class TeacherModuleQuestionManagementPage {
	tabRoots: Object[];
  subject_id:string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private alertCtrl: AlertController) {
    this.subject_id = navParams.get('subject_id');
    this.tabRoots = [
      {
        root: 'TeacherModuleQuestionObjectivePage',
        tabTitle: '客观题',
        params:{subject_id:this.subject_id}
      },
      {
        root: 'TeacherModuleQuestionSubjectivePage',
        tabTitle: '主观题',
        params:{subject_id:this.subject_id}
      }
    ];    	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleQuestionManagementPage');
  }
  addQuestion(){
    let alert1 = this.alertCtrl.create({
      title: '请选择题目的类型',
      inputs: [
        {
          type:'radio',
          value: '1',
          label:'主观题',
          checked:true,
        },
        {
          type:'radio',
          value: '2',
          label:'客观题',

        },
 
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            
          }
        },
        {
          text: '确定',
          handler: data => {
            if (data=='1'){
              //主观
              this.navCtrl.push('TeacherModuleQuestionSubjectiveAddPage',{subject_id:data})  
            }
            else if (data=='2'){
              //客观
              
              this.navCtrl.push('TeacherModuleQuestionObjectiveAddPage',{subject_id:data})

            }
            
          }
        }
      ]
    });
    alert1.present();        
  }

}
