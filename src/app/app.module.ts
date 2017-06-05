import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// storage and native and assets
import { AppData } from '../assets/data/app.data';
import { NativeService } from '../assets/providers/Native.Service';
import { IonicStorageModule } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
// pages
import { MyApp } from './app.component';
import { Tabs } from '../pages/tabs/tabs';
import { Welcome } from '../pages/welcome/welcome';
import { Home } from '../pages/home/home';
import { Mine } from '../pages/mine/mine'
import { Login } from '../pages/login/login';
import { UserInfo } from '../pages/user-info/user-info';
import { UserIntroductionPage } from '../pages/user-introduction/user-introduction';
import { NewWritingsPage } from '../pages/new-writings/new-writings';
import { MyWritingsPage } from '../pages/my-writings/my-writings';
import { WritingDetailPage } from '../pages/writing-detail/writing-detail';
import { MyLovePersonPage } from '../pages/my-love-person/my-love-person';
import { MyLoveWritingsPage } from '../pages/my-love-writings/my-love-writings';
import { MyFansPage } from '../pages/my-fans/my-fans';
import { PersonHomePage } from '../pages/person-home/person-home';
import { ComDetailPage } from '../pages/com-detail/com-detail';

@NgModule({
  declarations: [
    MyApp,
    Tabs,
    Welcome,
    Home,
    Mine,
    Login,
    UserInfo,
    UserIntroductionPage,
    NewWritingsPage,
    MyWritingsPage,
    WritingDetailPage,
    MyLovePersonPage,
    MyLoveWritingsPage,
    MyFansPage,
    PersonHomePage,
    ComDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Tabs,
    Welcome,
    Home,
    Mine,
    Login,
    UserInfo,
    UserIntroductionPage,
    NewWritingsPage,
    MyWritingsPage,
    WritingDetailPage,
    MyLovePersonPage,
    MyLoveWritingsPage,
    MyFansPage,
    PersonHomePage,
    ComDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppData,
    NativeService,
    Camera
  ]
})
export class AppModule {}
