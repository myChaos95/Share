import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLovePersonPage } from './my-love-person';

@NgModule({
  declarations: [
    MyLovePersonPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLovePersonPage),
  ],
  exports: [
    MyLovePersonPage
  ]
})
export class MyLovePersonPageModule {}
