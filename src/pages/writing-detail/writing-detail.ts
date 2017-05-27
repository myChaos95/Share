import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { NativeService } from '../../assets/providers/Native.Service';

import { AppData } from '../../assets/data/app.data';

import { PersonHomePage } from '../person-home/person-home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService, private storage: Storage) {
  	  this.user = this.navParams.get('user');
  	  this.writings = this.navParams.get('writings');
  	  this.native.hideTabs();
       this.ID = 0;
       this.isGuanzhu = AppData.isGuanzhu(this.ID,this.user.uID);
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

}
