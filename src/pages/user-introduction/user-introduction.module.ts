import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserIntroductionPage } from './user-introduction';

@NgModule({
  declarations: [
    UserIntroductionPage,
  ],
  imports: [
    IonicPageModule.forChild(UserIntroductionPage),
  ],
  exports: [
    UserIntroductionPage
  ]
})
export class UserIntroductionPageModule {}
