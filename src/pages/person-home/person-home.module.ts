import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonHomePage } from './person-home';

@NgModule({
  declarations: [
    PersonHomePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonHomePage),
  ],
  exports: [
    PersonHomePage
  ]
})
export class PersonHomePageModule {}
