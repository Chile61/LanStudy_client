import { Response } from "@angular/http";
import { Refresher, InfiniteScroll } from "ionic-angular";

export class ClientOptions {
    // 【必填参数】：请求成功的回调函数
    successCallback: (res: Response) => void;

    // 【可填参数】：请求失败的回调函数
    failureCallback?: () => void;

    // 【可填参数】：是否显示加载动画，默认为true
    isShowLoading?: boolean;

    // 【可填参数】：加载动画的文本，默认为“正在加载...”
    loadingText?: string;

    // 【可填参数】：如果使用了Refreshser控件，需要赋值。当请求结束时，会停止Refresher的刷新
    refresher?: Refresher;

    // 【可填参数】：如果使用了InfiniteScroll控件，需要赋值。当请求结束时，会停止InfiniteScroll的刷新
    infiniteScroll?: InfiniteScroll;

}