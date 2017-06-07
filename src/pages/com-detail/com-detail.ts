import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';

import { NativeService } from '../../assets/providers/Native.Service';

import { ReplyPage } from '../reply/reply';

@IonicPage()
@Component({
  selector: 'page-com-detail',
  templateUrl: 'com-detail.html',
})
export class ComDetailPage {

  comment: any;
  c_c: any;
  ID: 0;
  replyNum = 6;

  content: any;
  isReply = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
        this.comment = this.navParams.get('comment'); 	// 有评论人，和本用户是否点赞
        this.ID = 0;
  }

  init(e?) {
      this.replyNum = 6;
      this.native.hideTabs();
      this.c_c = AppData.getC_C(this.comment.cID, this.replyNum);
        this.c_c.map( ret => {
            ret.user = AppData.getUser(ret.fromID);
            ret.isZan = AppData.replyIsZan(this.ID, ret.c_cID);
        })
       NativeService.refreshComplete(e);
  }

  ionViewWillEnter() {
  	this.init();
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

  toggleReplyZan(c) {
      if(c.isZan) {
          c.loveCount -= 1;
          AppData.operReplyZan(this.ID, c.c_cID, 1);
      }else {
          c.loveCount += 1;
          AppData.operReplyZan(this.ID, c.c_cID);
      }
      c.isZan = !c.isZan;
  }

  getMoreReply(e) {
      this.replyNum += 6;
      this.c_c = AppData.getC_C(this.comment.cID, this.replyNum);
        this.c_c.map( ret => {
            ret.user = AppData.getUser(ret.fromID);
            ret.isZan = AppData.replyIsZan(this.ID, ret.c_cID);
        })
      NativeService.refreshComplete(e);
  }

  goReplyPage() { // wID, cID,   
      this.navCtrl.push(ReplyPage, {
          wID: this.comment.wID,
          cID: this.comment.cID
      });
  }

  reply(c) {
      //  在第二行显示....
      this.isReply = true;
      try{
          let header: any = document.querySelector('.replyToast header');
          header.style.webkitBoxOrient = 'vertical';
      }catch(e) {
          console.log(e);
      }
      this.content = c.content;
  }
 
}