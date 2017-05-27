import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeService } from '../../assets/providers/Native.Service';

@IonicPage()
@Component({
  selector: 'page-user-introduction',
  templateUrl: 'user-introduction.html',
})
export class UserIntroductionPage {

  user:any = {uID: 0, uInfo: ''};
  info = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
  		this.user = this.navParams.get('user');
  		this.info = this.user.uInfo;
  		this.native.hideTabs();
  }
  ionViewWillLeave() {
  	 this.native.showTabs();
  }

  makeChange() {
  	this.user.uInfo = this.info;
  	this.native.showToast('更改成功');
  	this.navCtrl.pop();
  }
}
