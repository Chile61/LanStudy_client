import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as echarts from 'echarts';
import { Response } from '@angular/http';
import { DataResult } from '../../utils/data-result';
import { Homework } from '../../utils/homework';
import { GlobalUrl } from '../../utils/global-url';
import { ClientNetworkService } from '../../services/client-network.service';

/**
 * Generated class for the ParentModuleHomeworkInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-parent-module-homework-info',
  templateUrl: 'parent-module-homework-info.html',
})
export class ParentModuleHomeworkInfoPage {
  tip: string;
  title: string;
  infoList: Array<Homework>;
  // @ViewChild('itemList') itemList: List;
  successCallback: (res: Response) => void;
  pageType: number;
  targetUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private network: ClientNetworkService) {
    this.successCallback = (res: Response) => {
      let dataResult = (<DataResult<Array<Homework>>>(res.json()));
      if (dataResult.status == "1") {
        this.infoList = dataResult.result;
        console.log("list is ", this.infoList);
        let dates = [];
        let scores = [];
        let ranks = [];
        this.infoList.forEach(element => {
          dates.push(element.createTime);
          scores.push(element.score);
          ranks.push(element.rank);
        });

        this.createChart(dates, scores, ranks);
      }

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParentModuleHomeworkInfoPage');

    this.tip = this.navParams.get("tip");
    let pageType = this.navParams.get("type");
    if (pageType == 'homeworkInfo') {
      this.title = '作业';
      this.pageType = 0;
      this.targetUrl = GlobalUrl.URL_PARENT_MODULE_GET_HOMEWORKS;
    }
    else if (pageType == 'practiceInfo') {
      this.title = '练习';
      this.pageType = 1;
      this.targetUrl = GlobalUrl.URL_PARENT_MODULE_GET_PRACTICES;
    }
    else if (pageType == 'examInfo') {
      this.title = '考试';
      this.pageType = 2;
      this.targetUrl = GlobalUrl.URL_PARENT_MODULE_GET_EXAMS;
    }
  }

  ionViewDidEnter() {

    this.getInfoList(this.targetUrl,
      localStorage.getItem('id'),
      localStorage.getItem('token'),
      localStorage.getItem('curStudentId'),
      localStorage.getItem('curSubjectId'));
  }

  createChart(dates: Array<string>, scores: Array<number>, ranks: Array<number>) {
    if (dates && scores) {
      const ec = echarts as any;
      const container = document.getElementById('chart');
      const chart = ec.init(container);
      chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let date: string = '';
            let value: string = '';

            if (params.length > 0) {
              for(let i = 0; i < params.length; i++){
                if(params[i].seriesName == '排名'){
                  date = params[i].name + '<br/>';
                  value += params[i].seriesName + ':第' + -params[i].value + '名';
                }
                else{
                  date = params[i].name + '<br/>';
                  value = params[i].seriesName + ':' + params[i].value + '分<br/>';
                }
              }
            }

            return date + value;
          }

        },
        legend: {
          data: ['分数', '排名']
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dates
          }
        ],
        yAxis: [
          {
            name: '分数(分)',
            type: 'value',
            max: 100
          },
          {
            name: '排名(名)',
            type: 'value',
            axisLabel: {
              formatter: function (v) {
                return -v;
              }
            }
          }
        ],
        series: [
          {
            name: '分数',
            type: 'line',
            smooth: true,
            data: scores,
          },
          {
            name: '排名',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: (function () {
              let len = ranks.length;
              while (len--) {
                ranks[len] *= -1;
              }
              return ranks;
            })()

          }
        ]
      }
      );
      console.log(chart);

    }
    else {
      console.log("create chart failed");
    }
  }


  getInfoList(url: string, token: string, parentId: string, studentId: string, subjectId: string) {
    let body = {
      'parentId': parentId,
      'token': token,
      'studentId': studentId,
      'subjectId': subjectId
    };



    this.network.postRequest(url, body, { successCallback: this.successCallback });
  }


}

