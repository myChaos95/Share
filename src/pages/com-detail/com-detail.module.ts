import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComDetailPage } from './com-detail';

@NgModule({
  declarations: [
    ComDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComDetailPage),
  ],
  exports: [
    ComDetailPage
  ]
})
export class ComDetailPageModule {}
