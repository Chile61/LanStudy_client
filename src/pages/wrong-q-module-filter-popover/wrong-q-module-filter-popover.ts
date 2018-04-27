import { Component} from '@angular/core';
import { ViewController ,NavParams,Events, IonicPage} from 'ionic-angular';
/**
 * Generated class for the WrongQModuleFilterPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-q-module-filter-popover',
  templateUrl: 'wrong-q-module-filter-popover.html',
})
export class WrongQModuleFilterPopoverPage {
	start_date:any;
	end_date:any;
  constructor(public viewCtrl: ViewController, public navParams: NavParams,public events: Events) {
  	this.start_date=null;
  	this.end_date=null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongQModuleFilterPopoverPage');
  }
  complete(){
  	this.viewCtrl.dismiss().then(()=>{
        this.events.publish('filter-change',this.start_date,this.end_date);
      }); 

  	// this.main_page.filter(this.start_date,this.end_date);
  }

}
