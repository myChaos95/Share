import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// storage and native
import { Storage } from '@ionic/storage';
// pages
import { Tabs } from '../pages/tabs/tabs';
import { Welcome } from '../pages/welcome/welcome';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    // first In 
    this.storage.get('notFirstIn').then(ret => {
        if(ret){
           this.rootPage = Tabs;
        }else{
            this.storage.set('notFirstIn',true);
            this.rootPage = Welcome;
        }
    })
  }
}

