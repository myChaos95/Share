import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides  } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { NativeService } from '../../assets/providers/Native.Service';

import { MyLovePersonPage } from '../my-love-person/my-love-person';
import { MyFansPage } from '../my-fans/my-fans';
import { WritingDetailPage } from '../writing-detail/writing-detail';

@IonicPage()
@Component({
  selector: 'page-person-home',
  templateUrl: 'person-home.html',
})

export class PersonHomePage {

  @ViewChild('imgC') imgC;

  bgImg;
  user: any;
  uLoveNum;
  uFansNum;

  index: number;
  active: boolean;

  poh = 'heart';
  images: any;
  writings: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
  	 this.user = this.navParams.get('user');
  }

  ngAfterViewInit() {
      console.log(this.imgC)
  }

  ionViewWillEnter() {
     this.bgImg =  `url('${this.user.bgImg}')`;
  	this.uLoveNum = this.user.lovesID.length;
  	this.uFansNum = AppData.getMyFans(this.user.uID).length;
  	this.images = AppData.getPersonPic(this.user.uID,9);
  	this.writings = AppData.getMyWritings(this.user.uID);
  }

  goLoves() {
  	this.navCtrl.push(MyLovePersonPage,{user: this.user});
  }

  goFans() {
  	this.navCtrl.push(MyFansPage,{user: this.user});
  }

  goBack() {
  	this.navCtrl.pop();
  }

  goDetail(wr) {
  	this.navCtrl.push(WritingDetailPage,{writings: wr, user: this.user});
  }

  showImg(e) {
     if(e.target.src) {
          this.index = e.target.getAttribute('index');
          this.active = true;
          this.native.hideTabs();
     }
  }

  hideImg() {
     this.active = false;
     this.native.showTabs();
  }
}
