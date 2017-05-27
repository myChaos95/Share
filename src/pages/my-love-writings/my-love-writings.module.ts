import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyLoveWritingsPage } from './my-love-writings';

@NgModule({
  declarations: [
    MyLoveWritingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyLoveWritingsPage),
  ],
  exports: [
    MyLoveWritingsPage
  ]
})
export class MyLoveWritingsPageModule {}
