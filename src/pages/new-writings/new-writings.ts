import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AppData } from '../../assets/data/app.data';
import { NativeService } from '../../assets/providers/Native.Service';
 
@IonicPage()
@Component({
  selector: 'page-new-writings',
  templateUrl: 'new-writings.html',
})
export class NewWritingsPage {
  id: number;
  myTitle: string = '';
  content: string;
  number: number = 0;
  wImg:any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private native: NativeService) {
  	this.id = this.navParams.get('id');
  }
  count() {
  	this.number = this.content.length;
  }

  sure() {
  	if(this.number == 0 || this.myTitle == ''){
  		this.native.showToast('请完善文章');
  	}else{
  		AppData.publicWrings(this.id,this.myTitle,this.content,this.wImg);
  		this.navCtrl.pop();
  		this.native.showToast('发表成功');
  	}
  }

  addImg() {
      this.native.getImg().then( imgData => {
          this.wImg = 'data:image/jpeg;base64,' + imgData;
      })
  }

}
