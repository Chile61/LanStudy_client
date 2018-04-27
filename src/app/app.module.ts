import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackButtonService } from '../services/back-button.service';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImgUploadService } from '../services/img-upload.service';
import { ClientToastService } from '../services/client-toast.service';
import { ClientNetworkService } from '../services/client-network.service';
import { ClientLoadingService } from '../services/client-loading.service';
import { ClientImgPickerService } from '../services/client-img-picker.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: "ios"
    }),
    HttpModule,
    IonicModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BackButtonService,
    ImgUploadService,
    ClientToastService,
    ClientNetworkService,
    ClientLoadingService,
    ClientImgPickerService,
    File,
    FileTransfer,
    FileTransferObject,
    ImagePicker,
  ]
})
export class AppModule { }
