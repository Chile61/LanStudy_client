import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { GlobalUserInfo } from '../../utils/global-user-info';
import { LoginInfo } from '../../utils/login-info';
import { DataResult } from '../../utils/data-result';
import { GlobalUrl } from '../../utils/global-url';
import { ClientToastService } from '../../services/client-toast.service';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';
import { ClientImgPickerService } from '../../services/client-img-picker.service';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';
/**
 * Generated class for the VisitCtrlModuleEditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-ctrl-module-editprofile',
  templateUrl: 'visit-ctrl-module-editprofile.html',
})
export class VisitCtrlModuleEditprofilePage {
  userInfo: LoginInfo;
  getProfileSuccessCallback: (res: Response) => void;
  updateSuccessCallback: (res: Response) => void;

  private base64Img: string;
  private userType: string;
  private profileUrl = [
    {
      GET: GlobalUrl.URL_VISIT_MODULE_GET_STUDENT_PROFILE,
      UPDATE: GlobalUrl.URL_VISIT_MODULE_UPDATE_STUDENT_PROFILE
    },
    {
      GET: GlobalUrl.URL_VISIT_MODULE_GET_TEACHER_PROFILE,
      UPDATE: GlobalUrl.URL_VISIT_MODULE_UPDATE_TEACHER_PROFILE
    },
    {
      GET: GlobalUrl.URL_VISIT_MODULE_GET_PARENT_PROFILE,
      UPDATE: GlobalUrl.URL_VISIT_MODULE_UPDATE_PARENT_PROFILE
    }
  ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private imgPickerService: ClientImgPickerService,
    private toast: ClientToastService,
    private network: ClientNetworkService,
    private loading: ClientLoadingService
  ) {
    this.userType = localStorage.getItem('userType');
    this.userInfo = new LoginInfo();
    
    console.log('userInfo = ', this.userInfo);
    this.getProfileSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<LoginInfo>>(res.json());
      if (dataResult.status == "1") {
        this.userInfo = dataResult.result;
        if (this.network.debugMode == false) {
          this.userInfo.picPath = GlobalUrl.URL_HOST1 + this.userInfo.picPath;
        }
      }

    }

    this.updateSuccessCallback = (res: Response) => {
      let dataResult = <DataResult<string>>(res.json());
      if (dataResult.status == "1") {
        console.log(dataResult);
        this.toast.showToast('修改成功');
      }
      else {
        this.toast.showToast('修改失败');
      }
    }
  }



  getProfile() {
    console.log("POST ==> getProfile.do");
    let body = {};
    if (localStorage.getItem('userType') == '1') {
      body = {
        'studentId': localStorage.getItem('userId')
      };
    }
    else if (localStorage.getItem('userType') == '2') {
      body = {
        'teacherId': localStorage.getItem('userId')
      };
    }
    else if (localStorage.getItem('userType') == '3') {
      body = {
        'parentId': localStorage.getItem('userId')
      }
    }

    console.log(body);
    this.network.postRequest(this.profileUrl[this.userType].GET, body, { successCallback: this.getProfileSuccessCallback });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisitCtrlModuleEditprofilePage');

    let school = document.getElementById("school");
    let birth = document.getElementById("birth");
    let gender = document.getElementById("gender");
    if (this.userInfo.userType == '3') {
      school.hidden = true;
      birth.hidden = true;
      gender.hidden = true;
    }

    this.getProfile();
  }

  onHeadImgClick() {
    let success = (url: string) => {
      this.userInfo.picPath = url;
    }
    this.imgPickerService.showPicActionSheet({ success: success });
  }



  onAcceptBtnClick() {
    let body = {
      'birthday': this.userInfo.birthday,
      'nickname': this.userInfo.nickname,
      'picPath': this.userInfo.picPath,
      'schoolName':this.userInfo.schoolName,
      'sex':this.userInfo.sex
    }
    console.log(body);
    this.network.postRequest(this.profileUrl[this.userType].UPDATE, body, {successCallback: this.updateSuccessCallback});
  }


}