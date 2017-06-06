import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeService } from '../../assets/providers/Native.Service';

@IonicPage()
@Component({
  selector: 'page-reply',
  templateUrl: 'reply.html',
})
export class ReplyPage {

  wID;
  cID;
  toUser;
  ID; // fromID

  time;
  content;
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
  	  this.wID = this.navParams.get('wID');
  	  this.cID = this.navParams.get('cID'); // -1 表示文章评论，其余为评论回复
  	  this.toUser = this.navParams.get('toUID');
  	  this.ID = 0;
  }

  ionViewWillEnter() {
    this.native.hideTabs();
  }

}
