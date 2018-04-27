import { Injectable } from "@angular/core";
import { ModalController } from "ionic-angular";
import { Http, RequestOptionsArgs, Response, Headers } from "@angular/http";
import { ClientToastService } from "./client-toast.service";
import { ClientOptions } from "../utils/client-options";
import { DataResult } from "../utils/data-result";
import { ClientLoadingService } from "./client-loading.service";

@Injectable()
export class ClientNetworkService {
    private requestOptions: RequestOptionsArgs;
    public debugMode = true;

    constructor(
        private modalCtrl: ModalController,
        private http: Http,
        private toastService: ClientToastService,
        private loadingService: ClientLoadingService
    ) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json;application/json;charset=UTF-8');

        if (this.debugMode) {
            this.requestOptions = { headers: headers };
        }
        else {
            this.requestOptions = {
                headers: headers,
                withCredentials: true
            }
        }

    }

    postRequest(url: string, body: {}, options: ClientOptions) {
        if (options.isShowLoading == null || options.isShowLoading == true)
            this.loadingService.showLoading(options.loadingText);

        this.http.post(url, body, this.requestOptions).subscribe(
            (res: Response) => {
                this.doSuccess(res, options)
            },
            response => {
                this.doError(response, options);
            },
            () => {
                this.doComplete();
            }
        );

    }

    getRequest(url: string, options: ClientOptions) {
        if (options.isShowLoading == null || options.isShowLoading == true)
            this.loadingService.showLoading(options.loadingText);

        this.http.get(url, this.requestOptions).subscribe(
            (res: Response) => {
                this.doSuccess(res, options)
            },
            response => {
                this.doError(response, options);
            },
            () => {
                this.doComplete();
            }
        );

    }

    deleteRequest(url: string, options: ClientOptions) {
        if (options.isShowLoading == null || options.isShowLoading == true)
            this.loadingService.showLoading(options.loadingText);

        this.http.delete(url, this.requestOptions).subscribe(
            (res: Response) => {
                this.doSuccess(res, options)
            },
            response => {
                this.doError(response, options);
            },
            () => {
                this.doComplete();
            }
        );
    }

    putRequest(url: string, options: ClientOptions) {
        if (options.isShowLoading == null || options.isShowLoading == true)
            this.loadingService.showLoading(options.loadingText);

        this.http.put(url, this.requestOptions).subscribe(
            (res: Response) => {
                this.doSuccess(res, options)
            },
            response => {
                this.doError(response, options);
            },
            () => {
                this.doComplete();
            }
        );
    }


    private doSuccess(res: Response, options: ClientOptions) {
        this.loadingService.hideLoading();
        if (options.refresher != null) {
            options.refresher.complete();
        }

        if (options.infiniteScroll != null) {
            options.infiniteScroll.complete();
        }

        console.log('Response = ', res);

        let dataResult = <DataResult<{}>>(res.json());

        if (dataResult.status == "0") {
            this.toastService.showToast('登录凭证已过期，请重新登录');
            localStorage.clear();
            this.modalCtrl.create('VisitCtrlModuleLoginPage').present();
        }
        else if (dataResult.status == "-2") {
            this.toastService.showToast('数据库连接发生错误，请稍后重试');
            localStorage.clear();
            this.modalCtrl.create('VisitCtrlModuleLoginPage').present();
        }
        else {
            options.successCallback(res);
        }
    }

    private doError(response, options: ClientOptions) {
        console.log("response = ", response);
        this.loadingService.hideLoading();

        if (options.failureCallback) {
            options.failureCallback();
        }
        if (options.refresher != null) {
            options.refresher.complete();
        }
        if (options.infiniteScroll != null) {
            options.infiniteScroll.complete();
        }
        this.toastService.showToast('连接失败，请稍后重试');

    }

    private doComplete() {
        console.log("request completed");
    }
}