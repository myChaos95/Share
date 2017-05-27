import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { WritingDetailPage } from '../writing-detail/writing-detail';

@IonicPage()
@Component({
  selector: 'page-my-writings',
  templateUrl: 'my-writings.html',
})
export class MyWritingsPage {

  user: any;
  myWritings = [];
  comments = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	  this.user = this.navParams.get('user');
  }

  ionViewWillEnter() {
  	 this.myWritings = AppData.getMyWritings(this.user.uID);
  }

  goDetail(wr) {
  	 this.navCtrl.push(WritingDetailPage,{writings: wr, user: this.user});
  }

}
