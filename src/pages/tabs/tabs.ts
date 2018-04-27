import { Component, ViewChild } from '@angular/core';
import { Tabs, NavParams, Platform, IonicPage, Events, NavController } from 'ionic-angular';
import { BackButtonService } from '../../services/back-button.service';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabRoots: Object[];
  @ViewChild('myTabs') tabRef: Tabs;

  constructor(params: NavParams,
    public navCtrl: NavController,
    public events: Events,
    private platform: Platform,
    public backBtnService: BackButtonService) {

    let accountType = params.get("accountType");
    console.log('accountType = ', accountType);
    
    // 家长
    if (accountType == '3') {
      this.tabRoots = [
        {
          root: "ParentModuleHomePage",
          tabTitle: '学习情况',
          tabIcon: 'home'
        },
        {
          root: "VisitCtrlModuleParentsMyPage",
          tabTitle: '我的',
          tabIcon: 'contact'
        }]
    }
    // 学生
    else if (accountType == '1') {
      this.tabRoots = [
        {
          root: "StudentModuleStudyPage",
          tabTitle: '学习',
          tabIcon: 'home'
        },
        {
          root: "AnswerModuleHomePage",
          tabTitle: '问答',
          tabIcon: 'chatboxes'
        },
        {
          root: "VisitCtrlModuleStudentsMyPage",
          tabTitle: '我的',
          tabIcon: 'contact'
        }]
    }
    // 教师
    else if (accountType == '2') {
      this.tabRoots = [
        {
          root: "TeacherModuleCoursePage",
          tabTitle: '课程',
          tabIcon: 'home'
        },
        {
          root: "AnswerModuleHomePage",
          tabTitle: '问答',
          tabIcon: 'chatboxes'
        },
        {
          root: "ClassManagerModuleClassInfoPage",
          tabTitle: '班级管理',
          tabIcon: 'people'
        },
        {
          root: "VisitCtrlModuleTeachersMyPage",
          tabTitle: '我的',
          tabIcon: 'contact'
        }
      ]
    } else {
      this.tabRoots = [{

      }]
    }

    this.platform.ready().then(() => {
      this.backBtnService.registerBackButtonAction(this.tabRef);
    });

    this.events.subscribe('tabs:logout',(params)=>{
      this.navCtrl.setRoot('VisitCtrlModuleLoginPage');
    });
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad tabsPage');
  }

  ionViewWillUnload(){
    console.log('ionViewWillUnload tabsPage');
  }
}
