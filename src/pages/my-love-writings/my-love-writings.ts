import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { NativeService } from '../../assets/providers/Native.Service';

import { WritingDetailPage } from '../writing-detail/writing-detail';

@IonicPage()
@Component({
  selector: 'page-my-love-writings',
  templateUrl: 'my-love-writings.html',
})
export class MyLoveWritingsPage {

  title: string; 
  myLoveWritings = [];
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  init(e?) {
      this.myLoveWritings = AppData.getMyLoveWritings(this.id);
      NativeService.refreshComplete(e);
  }
  
  ionViewWillEnter() {
  	this.id = this.navParams.get('user').uID;
  	this.init();
  }

  goDetail(list) {
  	this.navCtrl.push(WritingDetailPage,{ user: list.autor, writings: list})
  }

}
