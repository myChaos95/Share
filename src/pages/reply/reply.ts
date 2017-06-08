import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeService } from '../../assets/providers/Native.Service';

import { AppData } from '../../assets/data/app.data';

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
  type;

  title;
  time;
  content = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
  	  this.wID = this.navParams.get('wID');
  	  this.cID = this.navParams.get('cID'); // -1 表示文章评论，其余为评论回复
  	  this.toUser = this.navParams.get('toUID');
  	  this.ID = 0;
       this.type = this.navParams.get('type'); // 0 回复评论 , 1 回复用户
  }

  ionViewWillEnter() {
    this.native.hideTabs();
    if(this.cID == -1) {
       this.title = '发评论';
    }else {
        this.title = '回复评论';
        let user = AppData.getUser(this.toUser);
        let textarea: any = document.querySelector('textarea');
        textarea.placeholder = '回复' + user.uName;
    }
  }

  popout() {
      this.navCtrl.pop();
  }

  public() {
       if(this.content != '') {
           if(this.cID == -1) {
               AppData.publicWritingComments(this.wID,this.ID,this.content);
           }else {
               let text;
               if(this.type == 1) {
                     let user = AppData.getUser(this.toUser);
                     text = '@' + user.uName + ' :' + this.content;
               }else {
                   text = this.content;
               }
               AppData.replyComments(this.wID,this.cID,this.ID,this.toUser,text);
           }
           this.native.showToast('发送成功');
           this.popout();
       }else {
           this.native.showToast('回复内容不能为空');
       }
  }

}
