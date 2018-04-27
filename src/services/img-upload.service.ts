import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { ClientToastService } from "../services/client-toast.service";
import { File } from '@ionic-native/file';

@Injectable()
export class ImgUploadService {

    // 调用相机时传入的参数
    private cameraOpt = {
        quality: 50,
        destinationType: 1,
        // Camera.DestinationType.FILE_URI,
        sourceType: 1,
        // Camera.PictureSourceType.CAMERA,
        encodingType: 0,
        // Camera.EncodingType.JPEG,
        mediaType: 0,
        // Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true
    };


    // 调用相册时传入的参数
    private imagePickerOpt = {
        maximumImagesCount: 1,//选择一张图片
        width: 800,
        height: 800,
        quality: 80
    };


    // 图片上传的的api
    public uploadApi: string;
    upload: any = {
        fileKey: 'upload',//接收图片时的key
        fileName: 'imageName.jpg',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'//不加入 发生错误！！
        },

        params: {},//需要额外上传的参数
        success: (data) => { },//图片上传成功后的回调
        error: (err) => { },//图片上传失败后的回调
        listen: () => { },//监听上传过程
        imgPath: ''
    };

    constructor(private actionSheetCtrl: ActionSheetController,
        private noticeSer: ClientToastService,
        private camera: Camera,
        private imagePicker: ImagePicker,
        private transfer: FileTransfer,
        private file: File,
        private fileTransfer: FileTransferObject) {
        this.fileTransfer = this.transfer.create();
    }

    showPicActionSheet() {
        this.useASComponent();
    }

    // 使用ionic中的ActionSheet组件
    private useASComponent() {
        let actionSheet =
            this.actionSheetCtrl.create({
                title: '请选择',
                buttons: [
                    {
                        text: '拍照',
                        handler: () => {
                            this.startCamera();
                        }
                    },
                    {
                        text: '从手机相册选择',
                        handler: () => {
                            this.openImgPicker();
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: () => {
                        }
                    }
                ]
            });
        actionSheet.present();
    }

    // 启动拍照功能
    private startCamera() {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
            this.upload.imgPath = imageData;
            console.log(this.upload.imgPath);
        }, (err) => {
            this.noticeSer.showToast('ERROR:' + err);//错误：无法使用拍照功能！
        });
    }


    // 打开手机相册
    private openImgPicker() {
        // let temp = '';
        // this.imagePicker.getPictures(this.imagePickerOpt).then((results) => {
        //     for (var i = 0; i < results.length; i++) {
        //         temp = results[i];
        //         // this.upload.imgPath = temp;
        //         // console.log(this.upload.imgPath);
        //     }
        //     // this.uploadImg(temp);
        // }, (err) => {
        //     this.noticeSer.showToast('ERROR:' + err);//错误：无法从手机相册中选择图片！
        // });

        const options: CameraOptions = {
            quality: 100,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        // 获取图片
        this.camera.getPicture(options).then((imageData) => {
            // 获取成功
            let url = 'data:image/jpeg;base64,' + imageData;
            // this.uploadImg(url);

        }, (err) => {
            console.log('获取图片失败');
        });
    }

    // 上传图片
    uploadImg(path?: string) {
        // if (!path) {
        //     return;
        // }

        let options: FileUploadOptions;
        options = {
            fileKey: this.upload.fileKey,
            headers: this.upload.headers,
            params: this.upload.params
        };

        this.fileTransfer.upload(this.upload.imgPath, this.uploadApi, options).then((data) => {
            if (this.upload.success) {
                this.upload.success(JSON.parse(data.response));
            }
        }, (err) => {
            if (this.upload.error) {
                this.upload.error(err);
            } else {
                this.noticeSer.showToast('错误：上传失败！');
            }
        });
    }

    // 停止上传
    stopUpload() {
        if (this.fileTransfer) {
            this.fileTransfer.abort();
        }
    }

}