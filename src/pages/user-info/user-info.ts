import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { NativeService } from '../../assets/providers/Native.Service';

import { UserIntroductionPage } from '../user-introduction/user-introduction';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfo {

  user = { uID: 0, uName: '', lovesID: [] , uImg: '', loves: [], uInfo: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService,private alert: AlertController) 
  {
  	this.user = this.navParams.get('user');
  }

 changeImg() {
  	this.native.getImg().then( imageData => {
  		this.user.uImg = 'data:image/jpeg;base64,' + imageData;
  		this.native.showToast('设置成功');
  	})
  }

  changeName() {
  	this.alert.create({
  		title: '修改昵称',
  		inputs: [
  			{placeholder: this.user.uName}
  		],
  		buttons: [
  			{
  				text: '取消'
  			},
  			{
  				text: '确认',
  				handler: data => {
  					if(data[0] == ''){
  						this.native.showToast('昵称不能为空');
  					}else{
  						this.user.uName = data[0];
  						this.native.showToast('设置成功');
  					}
  				}
  			}
  		]
  	}).present();
  }

  changeInfo() {
  	 this.navCtrl.push(UserIntroductionPage,{user: this.user});
  }

}
