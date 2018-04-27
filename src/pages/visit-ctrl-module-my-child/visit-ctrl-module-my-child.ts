import { Component, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { IonicPage, ItemSliding, AlertController, NavController, NavParams } from 'ionic-angular';
import { Content } from 'ionic-angular/navigation/nav-interfaces';
import { Goods } from '../../utils/goods';
import { Http, Headers, Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
// import { GlobalUserInfo } from '../../utils/global-user-info';
import { GlobalUrl } from '../../utils/global-url';
import { Student } from '../../utils/student';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the VisitCtrlModuleMyChildPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-my-child',
  templateUrl: 'visit-ctrl-module-my-child.html',
})
export class VisitCtrlModuleMyChildPage {
  children: Array<Student>;
  host: string;
  getChildrenSuccessCallback: (res: Response) => void;
  addChildrenSuccessCallback: (res: Response) => void;
  deleteChildSuccessCallback: (res: Response) => void;

  constructor(private alertCtrl: AlertController, private network: ClientNetworkService, private toast: ClientToastService) {

    if(this.network.debugMode == false){
      this.host = GlobalUrl.URL_HOST1;
    }
    else{
      this.host = '';
    }

    this.children = new Array<Student>();
    this.getChildrenSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Array<Student>>>(res.json());
      if (dataResult.status == "1") {
        this.children = dataResult.result;
        this.children.forEach(element => {
          element.picPath = this.host + element.picPath;
        });
      }
    }

    this.addChildrenSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Student>>(res.json());
      if (dataResult.status == "1") {
        if (dataResult.result) {
          this.toast.showToast( '添加成功');
          this.getChildList();
        }
      }
      else if (dataResult.status == "-1") {
        this.toast.showToast( '查询失败，请检查输入的手机号')
      }
      else if (dataResult.status == "2") {
        this.toast.showToast( '该孩子已经添加过了');
      }
    }

    this.deleteChildSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<Object>>(res.json());
      console.log(dataResult.status);
      if (dataResult.status == "1") {
        this.toast.showToast( '删除成功');
        this.getChildList();
      }
    }
  }

  getChildList() {
    console.log("POST ==> getChildList.do");
    let body = {
      'parentId': localStorage.getItem('userId')
    };
    this.network.postRequest(GlobalUrl.URL_PARENT_MODULE_GET_CHILDREN, body, { successCallback: this.getChildrenSuccessCallback });

  }

  addChild(tel: string) {
    console.log("POST ==> addChild.do");
    let body = {
      'parentId': localStorage.getItem('userId'),
      'studentTelnumber': tel
    };
    console.log('body = ', body);
    this.network.postRequest(GlobalUrl.URL_PARENT_MODULE_ADD_CHILD, body, { successCallback: this.addChildrenSuccessCallback });
    this.getChildList();
  }

  onAddBtnClick() {
    let alert = this.alertCtrl.create({
      title: '添加孩子',
      message: '请输入孩子的手机号',
      inputs: [
        {
          name: 'title',
          placeholder: '手机号',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
          }
        },
        {
          text: '添加',
          handler: data => {
            this.addChild(data.title);
          }
        }
      ]
    });

    alert.present();
  }

  onDeleteBtnClick(index) {
    let body = {
      'parentId': localStorage.getItem('userId'),
      'studentId': this.children[index].studentId
    }

    this.network.postRequest(GlobalUrl.URL_PARENT_MODULE_DEL_CHILD, body, { successCallback: this.deleteChildSuccessCallback });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleEditprofilePage');
    this.getChildList();
  }

}
