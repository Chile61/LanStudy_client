import { Injectable } from "@angular/core";
import { LoadingController, Loading } from "ionic-angular";

@Injectable()
export class ClientLoadingService {
    private loading: Loading;

    constructor(private loadingCtrl: LoadingController) {

    }

    showLoading(msg?: string) {
        if (!msg) {
            msg = '正在连接...'
        }
        if (!this.loading) {
            this.loading = this.loadingCtrl.create({ content: msg });
        }
        this.loading.present();


    }

    hideLoading() {
        if (this.loading) {
            this.loading.dismiss();
            this.loading = null;
        }
    }
}