import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// pages
import { Tabs } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  welBack1 = "assets/imgs/b_1.jpg";
  welBack2 = "assets/imgs/b_2.jpg";
  welBack3 = "assets/imgs/b_3.jpg";

  goHome() {
  	this.navCtrl.setRoot(Tabs);
  }

}
