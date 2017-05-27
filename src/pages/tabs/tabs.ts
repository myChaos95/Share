import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//pages
import { Home } from '../home/home';
import { Mine } from '../mine/mine';
import { NewWritingsPage } from '../new-writings/new-writings';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class Tabs {
  home = Home;
  mine = Mine;
  id: number;
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  	this.storage.get('uID').then(ret => {
  		if(ret){
  			this.id = ret;
  		}else{
  			this.id = 0;
  		}
  	})
  }

  write() {
  	this.navCtrl.push(NewWritingsPage,{id: this.id});
  }
}
