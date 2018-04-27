import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GlobalUrl } from '../../utils/global-url';
import { DataResult } from '../../utils/data-result';
import { Response } from '@angular/http';
import { ClientNetworkService } from '../../services/client-network.service';
import { ClientLoadingService } from '../../services/client-loading.service';
import { ClientToastService } from '../../services/client-toast.service';
/**
 * Generated class for the TeacherModuleQuestionSubjectiveAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teacher-module-question-subjective-add',
  templateUrl: 'teacher-module-question-subjective-add.html',
})
export class TeacherModuleQuestionSubjectiveAddPage {
  imgWidth: any;
  imgHeight: any;
  private _IMG: any;
  myImageSrc: string;
  subject_id: string;
  answer: string;
  isUpLoad: boolean;
  successCallback: (res: Response) => void;

  constructor(public navCtrl: NavController, public navParams: NavParams,private toast:ClientToastService, private network: ClientNetworkService, private loading: ClientLoadingService, private camera: Camera) {
    this.subject_id = navParams.get('subject_id');
    this.answer = "";
    this.successCallback = (res: Response) => {
      // let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      // this.homework_list = dataResult.result;
    }
    this.imgWidth = 233;
    this.imgHeight = 158;
    this.myImageSrc = './assets/imgs/pic_upload.png';
    this.isUpLoad = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherModuleQuestionSubjectiveAddPage');
  }

  pic_upload() {
    // 设置选项
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.loading.showLoading('正在加载');
    // 获取图片
    this.camera.getPicture(options).then((imageData) => {
      // 获取成功
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myImageSrc = base64Image;
      this.isUpLoad = true;
      this.loading.hideLoading();
    }, (err) => {
      this.toast.showToast('加载失败');
      this.myImageSrc = './assets/imgs/pic_upload.png';
      this.isUpLoad = false;
      this.loading.hideLoading();
    });
  }
  complete() {
    //参数 teacher_id localStorage.getItem('userId')
    // pic 
    // answer this.answer
    // subject_id this.subject_id
    // grade 1
    if (this.answer == "") {
      this.toast.showToast('请输入参考答案！');
      return;
    }
    if (!this.isUpLoad) {
      this.toast.showToast('请上传图片！');
      return;
    }
  }

}
