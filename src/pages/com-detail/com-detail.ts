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

  nowC_C: any;
  isReply = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
        this.comment = this.navParams.get('comment'); 	// ÓÐÆÀÂÛÈË£¬ºÍ±¾ÓÃ»§ÊÇ·ñµãÔÞ
        this.ID = 0;
  }

  init(e?) {
     this.isReply = false;
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

  goReplyPage() { // wID, cID,toUID
      this.navCtrl.push(ReplyPage, {
          wID: this.comment.wID,
          cID: this.comment.cID,
          toUID: this.comment.uID,
          type: 0
      });
  }

  replyUser(c) {
      this.navCtrl.push(ReplyPage, {
          wID: this.comment.wID,
          cID: this.comment.cID,
          toUID: c.user.uID,
          type: 1
      })
  }

  reply(c,e) {
      //  ÔÚµÚ¶þÐÐÏÔÊ¾...
      if(e.target.className.indexOf('btn')  != -1 || e.target.className.indexOf('button-inner') != -1){
          this.toggleReplyZan(c);
          return;
      }
      this.isReply = true;
      try{
          let header: any = document.querySelector('.replyToast header');
          header.style.webkitBoxOrient = 'vertical';
      }catch(e) {
          let t;
          console.log(e);
          clearInterval(t);
          t = setInterval(() => {
               let header: any = document.querySelector('.replyToast header');
               if(header) {
                   header.style.webkitBoxOrient = 'vertical';
                   clearInterval(t);
               }
          },1);
      }
      this.nowC_C = c;
  }

  hideMask() {
      this.isReply = false;
  }

  

 
}