import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { Storage } from '@ionic/storage';
import { NativeService } from '../../assets/providers/Native.Service';

import { Login } from '../login/login';
import { UserInfo } from '../user-info/user-info';
import { MyWritingsPage } from '../my-writings/my-writings';
import { MyLovePersonPage } from '../my-love-person/my-love-person';
import { MyLoveWritingsPage } from '../my-love-writings/my-love-writings';
import { MyFansPage }  from '../my-fans/my-fans';
import { PersonHomePage } from '../person-home/person-home';

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class Mine {
  
  user = { uID: 0, uName: '', lovesID: [] , uImg: '', loves: [], uInfo: '', isLogin: true};
  mine_list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  	// 检测是否登陆
  	this.storage.get('uID').then(ret => {
  		let id: number;
  		if(ret){
  			id = +ret;
  		}else{
  			id = 0;
  		}
  		// 初始化用户信息
  		this.user = AppData.users.find( user => {
  			return user.uID == id;
  		})
  	})
  }
 
  init(e?) {
      this.mine_list = [
           {icon: 'paper', title: '我的文章', count: AppData.getMyWritings(this.user.uID).length, color: 'lightGreen', page: MyWritingsPage},
          {icon: 'star', title: '我的关注', count: this.user.lovesID.length, color: 'blue',page: MyLovePersonPage},
          {icon: 'home', title: '我的粉丝', count: AppData.getMyFans(this.user.uID).length, color: 'yellow',page: MyFansPage},
          {icon: 'heart', title: '我的收藏', count: this.user.loves.length, color: 'red', page: MyLoveWritingsPage},
      ];
      NativeService.refreshComplete(e);
  }

  ionViewWillEnter() {
      this.init();
  }
  // 进入更改个人用户信息
  editUserBaseInfo() {
  	if(this.user.isLogin) {
  		this.navCtrl.push(UserInfo,{user: this.user});
  	}else{
  		this.navCtrl.push(Login);
  	}
  }

  viewMineList(list){
      if(this.user.isLogin){
        this.navCtrl.push(list.page,{user: this.user});
      }else{
        this.navCtrl.push(Login);
      }
  }

  goPersonPage(e) {
      if(e.target.className.indexOf('icon') != -1 ) {
         this.editUserBaseInfo();
      }else{
         this.navCtrl.push(PersonHomePage,{user: this.user});
      }
  }

}
