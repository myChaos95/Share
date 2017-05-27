import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WritingDetailPage } from './writing-detail';

@NgModule({
  declarations: [
    WritingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WritingDetailPage),
  ],
  exports: [
    WritingDetailPage
  ]
})
export class WritingDetailPageModule {}
