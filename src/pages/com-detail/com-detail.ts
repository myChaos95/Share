import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';

import { NativeService } from '../../assets/providers/Native.Service';

@IonicPage()
@Component({
  selector: 'page-com-detail',
  templateUrl: 'com-detail.html',
})
export class ComDetailPage {

  comment: any;
  c_c: any;
  ID: 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
        this.comment = this.navParams.get('comment'); 	// 有评论人，和本用户是否点赞
        this.ID = 0;
  }

  ionViewWillEnter() {
  	this.native.hideTabs();
  	this.c_c = AppData.getC_C(this.comment.cID);
  }

  toggleZan() {
  	if(this.comment.isZan) {
          this.comment.loveCount = this.comment.loveCount - 1;
          AppData.operZan(this.ID,this.comment.cID, 1);
      }else {
         this.comment.loveCount = this.comment.loveCount + 1;
          AppData.operZan(this.ID,this.comment.cID, 0);
      }
     this.comment.isZan = !this.comment.isZan;
  }
 
}