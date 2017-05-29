import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { NativeService } from '../../assets/providers/Native.Service';

import { WritingDetailPage  } from '../writing-detail/writing-detail';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  ID;
  select = 'hot';
  writings: any;
  wCount = 6;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.ID = 0;
  	this.init();
  }
  

  init(e?) {
  	this.wCount = 6;
	  	switch(this.select) {
	  		case 'hot': 
	  			this.writings =AppData.getHotWritings(this.wCount);
	  			this.writings.map(ret => {
	  				ret.user = AppData.getUserByWritings(ret.wID);
	  			})
	  			break;
	  		case 'myLove' :
	  			this.writings = AppData.getAllMyLoveWritings(this.ID,this.wCount);
	  			this.writings.map(ret => {
	  				ret.user = AppData.getUserByWritings(ret.wID);
	  			})
	  			break;
	  		default: 
	  			;
	  	}
  	NativeService.refreshComplete(e);
  }

  getMoreWritings() {
  	this.wCount += 6;
  	switch(this.select) {
		case 'hot': 
	 		this.writings =AppData.getHotWritings(this.wCount);
			this.writings.map(ret => {
				ret.user = AppData.getUserByWritings(ret.wID);
			})
			break;
	 	case 'myLove' :
	 		this.writings = AppData.getAllMyLoveWritings(this.ID,this.wCount);
	 		this.writings.map(ret => {
	  			ret.user = AppData.getUserByWritings(ret.wID);
	  		})
			break;
		default: 
			;
	}
  }

  goDetail(w) {
  	this.navCtrl.push(WritingDetailPage,{writings: w, user: w.user});
  }

}
