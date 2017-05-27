import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';

import { PersonHomePage } from '../person-home/person-home';

@IonicPage()
@Component({
  selector: 'page-my-fans',
  templateUrl: 'my-fans.html',
})
export class MyFansPage {
  
  myFans: any;
  user: any;
  ID;
  title;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	 this.user = this.navParams.get('user');
     this.ID = 0;
  }

  ionViewWillEnter() {
    if(this.ID  == this.user.uID) {
         this.title = '我的粉丝';
     }else {
         this.title = '他的粉丝'     
     }
  	this.myFans = AppData.getMyFans(this.user.uID);
  	this.myFans.map( ret => {
  		ret.isGuanzhu = AppData.isGuanzhu(this.ID,ret.uID);
  	})
  }

  addGuanzhu(fans) {
  	AppData.opLovePerson(this.ID,fans.uID);
  	fans.isGuanzhu = true;
  }

  cancleGuanzhu(fans) {
  	AppData.opLovePerson(this.ID,fans.uID,1);
  	fans.isGuanzhu = false;
  }

  toggleGuanzhu(fans) {
  	fans.loading = true;
	if( fans.isGuanzhu ) {
  		this.cancleGuanzhu(fans);
  	}else {
  		this.addGuanzhu(fans);
  	}
  	setTimeout(() => {
  		fans.loading = false;
  	},700);
  }

  goPersonPage(e,user) {
    if(e.target.className.indexOf('icon') != -1) {
        this.toggleGuanzhu(user);
    }else {
       this.navCtrl.push(PersonHomePage,{user: user});
    }
  }

}
