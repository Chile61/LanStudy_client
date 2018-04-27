import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { StudentQuestion } from '../../utils/student-question'
import { Camera, CameraOptions } from '@ionic-native/camera';
//import { PhotoViewer } from '@ionic-native/photo-viewer';
import { PaperInfo } from '../../utils/paperInfo'
import { ClientLoadingService } from '../../services/client-loading.service';

@IonicPage()
@Component({
  selector: 'page-student-module-study-subjective-question',
  templateUrl: 'student-module-study-subjective-question.html',
})
export class StudentModuleStudySubjectiveQuestionPage {
  studentQuestionList: Array<StudentQuestion>;
  studentQuestion: StudentQuestion;
  //初始时的题号
  curSubjective: number;
  //标记第几题
  currentId: number;
  //客观题题号
  subjective: number[] = [];
  numberOfQuestion: number;
  base64Img: string = '';
  constructor(
    private camera: Camera,
    //private photoViewer: PhotoViewer,
    public navCtrl: NavController,
    public alertCtrl:AlertController,
    private loading: ClientLoadingService,
    public navParams: NavParams) {
    this.subjective = this.navParams.get('dataSub');
    this.studentQuestionList = PaperInfo.question;
    if (localStorage.getItem('curSubjective'))
      this.curSubjective = parseInt(localStorage.getItem('curSubjective'), 10);
    else
      this.curSubjective = this.subjective[0];
    this.currentId = 1;
    this.numberOfQuestion = 4;
    //获取题目
    
    //设置当前题目
    this.studentQuestion = this.studentQuestionList[this.subjective[this.currentId - 1]];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentModuleStudySubjectiveQuestionPage');
  }

  public takePicture() {
    const options: CameraOptions = {
      quality: 50,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.loading.showLoading('正在加载');

    this.camera.getPicture(options).then((imageData) => {
      this.base64Img = 'data:image/jpeg;base64,' + imageData;
      this.studentQuestion.answerPic = this.base64Img;
      this.loading.hideLoading();
      
    }, (err) => {
      // Handle error
      console.log(err)
      this.loading.hideLoading();
      
    });
  }
  /*
  public PhotoViewer(){
    this.photoViewer.show(this.base64Img, '拍摄照片')
  }
  */
  submitQuestion() {
    this.studentQuestionList[this.subjective[this.currentId - 1]].isFinished = true;
    PaperInfo.question[this.subjective[this.currentId - 1]].isFinished = true;
    console.log(this.studentQuestionList[this.currentId].isFinished);
    //localStorage.setItem('curSubjective', this.currentId.toString());
  }
  nextQuestion() {
    if (this.currentId < this.numberOfQuestion) {
      this.currentId++;
      console.log(this.currentId);
      this.studentQuestion = this.studentQuestionList[this.subjective[this.currentId - 1]];
    }
    else{
      this.warnEnd();
    }
  }
  preQuestion() {
    if (this.currentId > 1) {
      this.currentId--;
      console.log(this.currentId);
      this.studentQuestion = this.studentQuestionList[this.subjective[this.currentId - 1]];
    }
    else{
      this.warnFirst();
    }
  }
  warnFirst() {

    let alert = this.alertCtrl.create({
      title: '警告',
      subTitle: "已经是第一题",
      buttons: ['OK']
    });
    alert.present();

  }
  warnEnd() {
    let alert = this.alertCtrl.create({
      title: '警告',
      subTitle: "已经是最后一题",
      buttons: ['提交']
    });
    alert.present();
  }
}

