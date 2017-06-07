import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NativeService } from '../../assets/providers/Native.Service';

import { AppData } from '../../assets/data/app.data';

import { PersonHomePage } from '../person-home/person-home';
import { ComDetailPage } from '../com-detail/com-detail';
import { ReplyPage } from '../reply/reply';

@IonicPage()
@Component({
  selector: 'page-writing-detail',
  templateUrl: 'writing-detail.html',
})
export class WritingDetailPage {
  
  user: any = {};
  writings: any = {};
  isGuanzhu: any;
  ID: any;
  isLoading: any = false;

  only_autor = false;
  comments;
  comNum = 4;

  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService, private storage: Storage) {
  	  this.user = this.navParams.get('user');
  	  this.writings = this.navParams.get('writings');
       this.ID = 0;
  }

  init(e?) {
      this.comNum = 4;
      this.isGuanzhu = AppData.isGuanzhu(this.ID,this.user.uID);
       this.comments = AppData.getWritingComments(this.writings.wID, this.comNum);
       this.comments.map( ret => {
           ret.user = AppData.getUserByComments(ret.cID);
           ret.isZan = AppData.isZan(this.ID, ret.cID);
           ret.c_c_num = AppData.getC_C(ret.cID).length;
       })
      this.native.hideTabs();
      NativeService.refreshComplete(e);
  }

  ionViewWillEnter() {
       this.init();
  }

  ionViewWillLeave() {
  	 this.native.showTabs();
  }

  goPersonHome(e) {
      if(e.target.className.indexOf('button') != -1){
        this.isLoading = true;
        setTimeout( () => {
          this.isLoading = false;
        },700);
          if(this.isGuanzhu) {
              AppData.opLovePerson(this.ID,this.user.uID,1);
          }else {
              AppData.opLovePerson(this.ID,this.user.uID);
          }
          this.isGuanzhu = !this.isGuanzhu;
      }else {
          this.navCtrl.push(PersonHomePage,{user: this.user});
      }
  }

  goPersonHomeS(user) {
      this.navCtrl.push(PersonHomePage,{user: user});
  }

  conStatus() {
      this.only_autor = !this.only_autor;
      this.native.showLoading({
          duration: 300,
          showBackdrop: false,
          spinner: 'ios',
      });
      this.comments = AppData.getWritingComments(this.writings.wID, this.comNum);
  }

  toggleZan(c) {
      if(c.isZan) {
          c.loveCount = c.loveCount - 1;
          AppData.operZan(this.ID,c.cID, 1);
      }else {
          c.loveCount = c.loveCount + 1;
          AppData.operZan(this.ID,c.cID, 0);
      }
      c.isZan = !c.isZan;
  }

  goCommentsDetail(c) {
      this.navCtrl.push(ComDetailPage,{ comment: c });
  }


  getMoreComments(e) {
      this.comNum += 4;
      this.comments = AppData.getWritingComments(this.writings.wID, this.comNum, 1, this.writings.user.uID);
       this.comments.map( ret => {
           ret.user = AppData.getUserByComments(ret.cID);
           ret.isZan = AppData.isZan(this.ID, ret.cID);
           ret.c_c_num = AppData.getC_C(ret.cID).length;
       })
       NativeService.refreshComplete(e);
  }

  goReplyPage() { // wID, 
      this.navCtrl.push(ReplyPage,{
          wID: this.writings.wID,
          cID: -1,
      });
  }

}
