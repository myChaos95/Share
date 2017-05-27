import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';

import { PersonHomePage } from '../person-home/person-home';

@IonicPage()
@Component({
  selector: 'page-my-love-person',
  templateUrl: 'my-love-person.html',
})
export class MyLovePersonPage {
  myLoves: any;
  user: any;
  ID;
  title;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	 this.user = this.navParams.get('user');
      this.ID = 0;
  }

  ionViewWillEnter() {
     if(this.ID  == this.user.uID) {
         this.title = '我的关注';
     }else {
         this.title = '他的关注'     
     }
  	this.myLoves = AppData.getMyLove(this.user.uID);
  	this.myLoves.map( ret => {
  		ret.isGuanzhu = AppData.isGuanzhu(this.ID,ret.uID);
          ret.loading = false;
  	})
  }

  addGuanzhu(love) {
  	AppData.opLovePerson(this.ID,love.uID);
  	love.isGuanzhu = true;
  }

  cancleGuanzhu(love) {
  	AppData.opLovePerson(this.ID,love.uID,1);
  	love.isGuanzhu = false;
  }

  toggleGuanzhu(love) {
  	love.loading = true;
	if( love.isGuanzhu ) {
  		this.cancleGuanzhu(love);
  	}else {
  		this.addGuanzhu(love);
  	}
  	setTimeout(() => {
  		love.loading = false;
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
