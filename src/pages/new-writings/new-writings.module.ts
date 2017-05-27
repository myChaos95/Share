import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWritingsPage } from './new-writings';

@NgModule({
  declarations: [
    NewWritingsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWritingsPage),
  ],
  exports: [
    NewWritingsPage
  ]
})
export class NewWritingsPageModule {}
