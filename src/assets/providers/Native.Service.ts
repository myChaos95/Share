import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { ToastController } from 'ionic-angular';

import { LoadingController } from 'ionic-angular';

let cameraOptions: CameraOptions = {
	destinationType: 0,
	sourceType: 2,
	targetWidth: 800,
	targetHeight: 800,
	allowEdit: true,
	quality: 100
}

@Injectable()
export class NativeService {
	constructor(private camera: Camera, private toast: ToastController, private loadingCtrl: LoadingController){}

	static refreshComplete(e,fuc?) {
		if(e) {
			setTimeout( () => {
				if(fuc) {
					fuc();
				}
				try{
					e.complete();
				}catch(e){
					console.log(e);
				}
			}, 700);
		}
	}
	getImg() {
		return this.camera.getPicture(cameraOptions);
	}
	showToast(message,duration=2000,pos='top') {
		this.toast.create({
			message: message,
			duration: duration,
			position: pos
		}).present();
	}
	hideTabs() {
		let tabs = document.querySelectorAll('.tabbar');
  		if(tabs != null){
  			Object.keys(tabs).map( index => {
  				tabs[index].style.display = 'none';
  			})
  		}
	}
	showTabs() {
		let tabs = document.querySelectorAll('.tabbar');
  		if(tabs != null){
  			Object.keys(tabs).map( index => {
  				tabs[index].style.display = 'flex';
  			})
  		}
	}
	showLoading(options){
		this.loadingCtrl.create(options).present();
	}
}