import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
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
  
  ionViewWillEnter() {
  	this.id = this.navParams.get('user').uID;
  	this.myLoveWritings = AppData.getMyLoveWritings(this.id);
  }

  goDetail(list) {
  	this.navCtrl.push(WritingDetailPage,{ user: list.autor, writings: list})
  }

}
