import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule, NavController, AlertController } from '@ionic/angular';

import { RegistrationPage } from './registration.page';
import {ComponentsModule} from '../../shared/components.module';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
      ComponentsModule
  ],
  declarations: [RegistrationPage]
})
export class RegistrationPageModule {

  createSuccess = false;
  registerCredentials = { name: '', email: '', password: '', confirmation_password: '' };

  constructor(
    private nav: NavController,
   // private auth: AuthServiceProvider,
    private alertCtrl: AlertController
  ) {}

}
