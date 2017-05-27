import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWritingsPage } from './my-writings';

@NgModule({
  declarations: [
    MyWritingsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWritingsPage),
  ],
  exports: [
    MyWritingsPage
  ]
})
export class MyWritingsPageModule {}
