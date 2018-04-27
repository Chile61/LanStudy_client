import { Injectable } from "@angular/core";
import { ActionSheetController } from "ionic-angular";
import { ClientToastService } from "./client-toast.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { ClientNetworkService } from "./client-network.service";


@Injectable()
export class ClientImgPickerService {
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

    constructor(private actionSheetCtrl: ActionSheetController, private network: ClientNetworkService, private noticeSer: ClientToastService, private camera: Camera, private imagePicker: ImagePicker) {

    }

    showPicActionSheet(callback: { success: (url: string) => void }) {
        this.useASComponent(callback);
    }

    private useASComponent(callback: { success: (url: string) => void }) {
        let actionSheet = this.actionSheetCtrl.create({
            title: '请选择',
            buttons: [
                {
                    text: '拍照',
                    handler: () => {
                        this.startCamera(callback);
                    }
                },
                {
                    text: '从手机相册选择',
                    handler: () => {
                        // this.openImgPicker(callback);
                        this.openImgPickerDebug(callback);
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
    private startCamera(callback: { success: (url: string) => void }) {
        this.camera.getPicture(this.cameraOpt).then((imageData) => {
            let url = 'data:image/jpeg;base64,' + imageData;
            callback.success(url);
        }, (err) => {
            this.noticeSer.showToast('ERROR:' + err);//错误：无法使用拍照功能！
        });
    }

    // 打开手机相册
    private openImgPicker(callback: { success: (url: string) => void }) {
        this.imagePicker.getPictures(this.imagePickerOpt).then((results) => {
            for (var i = 0; i < results.length; i++) {
                let url = 'data:image/jpeg;base64,' + results[i];
                callback.success(url);

            }
        }, (err) => {
            this.noticeSer.showToast('ERROR:' + err);//错误：无法从手机相册中选择图片！
        });

    }

    private openImgPickerDebug(callback: { success: (url: string) => void }) {
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
            callback.success(url);

            // this.uploadImg(url);

        }, (err) => {
            console.log('获取图片失败');
        });
    }
}